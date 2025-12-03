#!/bin/bash

#############################################
# Professional Docker Build & Deploy Script
# Author: Rupesh + ChatGPT
#############################################

set -euo pipefail

########################
# CONFIG
########################
BACKEND_IMAGE="rupesh1997/course-management-system:1.0.0"
FRONTEND_IMAGE="rupesh1997/course-management-system-frontend:1.0.0"
FRONTEND_BUILD_ARG="docker"
COMPOSE_FILE="docker/docker-compose/default/docker-compose.yaml"
LOG_FILE="deploy.log"

########################
# COLORS
########################
RED="\e[31m"
GREEN="\e[32m"
BLUE="\e[34m"
YELLOW="\e[33m"
RESET="\e[0m"

########################
# LOGGER
########################
log() { echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${RESET} $1" | tee -a "$LOG_FILE"; }
success() { echo -e "${GREEN}[SUCCESS]${RESET} $1" | tee -a "$LOG_FILE"; }
error() { echo -e "${RED}[ERROR]${RESET} $1" | tee -a "$LOG_FILE"; exit 1; }
warn() { echo -e "${YELLOW}[WARN]${RESET} $1" | tee -a "$LOG_FILE"; }

########################
# SAFE EXEC
########################
run_cmd() {
  log "Running: $*"
  eval "$@" || error "Command failed: $*"
}

########################
# IMAGE DETECTION
########################
image_exists() {
  docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "^$1$"
}

ask_rebuild() {
  local image=$1
  local component=$2

  if image_exists "$image"; then
    warn "$component image already exists: $image"
    read -p "Do you want to rebuild the $component image? (y/n): " ans
    [[ "$ans" == "y" || "$ans" == "Y" ]] && return 0 || return 1
  else
    return 0   # No image exists → must build
  fi
}

########################
# BUILD FUNCTIONS
########################
build_backend() {
  log "Building BACKEND image..."

  run_cmd "docker build \
      -t $BACKEND_IMAGE \
      -f docker/backend/Dockerfile \
      ./backend"

  success "Backend image built."
}

build_frontend() {
  log "Building FRONTEND image..."

  run_cmd "docker build \
      -t $FRONTEND_IMAGE \
      --build-arg CONFIGURATION=$FRONTEND_BUILD_ARG \
      -f docker/frontend/Dockerfile \
      ./frontend"

  success "Frontend image built."
}

########################
# CONTROLLED BUILD (with user prompts)
########################
controlled_build() {
  local build_backend_flag=false
  local build_frontend_flag=false

  if ask_rebuild "$BACKEND_IMAGE" "Backend"; then
    build_backend_flag=true
  fi

  if ask_rebuild "$FRONTEND_IMAGE" "Frontend"; then
    build_frontend_flag=true
  fi

  # If both or one are selected → build them
  if $build_backend_flag && $build_frontend_flag; then
    build_all
  elif $build_backend_flag; then
    build_backend
  elif $build_frontend_flag; then
    build_frontend
  else
    log "Skipping all builds (user selected no)."
  fi
}

########################
# PARALLEL BUILD
########################
build_all() {
  log 'Starting parallel build for backend and frontend...'

  (
    build_backend
  ) &
  BACKEND_PID=$!

  (
    build_frontend
  ) &
  FRONTEND_PID=$!

  log "Waiting for both builds to finish..."

  wait $BACKEND_PID || error "Backend build failed!"
  wait $FRONTEND_PID || error "Frontend build failed!"

  success "Both backend & frontend images built successfully (parallel)."
}

########################
# DEPLOY FUNCTIONS
########################
stop_existing_containers() {
  if docker compose -f "$COMPOSE_FILE" ps --quiet | grep -q .; then
    warn "Existing containers detected. Stopping..."
    docker compose -f "$COMPOSE_FILE" down || warn "Failed to stop existing containers."
  fi
}

deploy() {
  stop_existing_containers
  log "Deploying services..."
  run_cmd "docker compose -f $COMPOSE_FILE up -d"
  success "Deployment completed."
  run_cmd "docker ps"
}

down() {
  log "Stopping stack..."
  run_cmd "docker compose -f $COMPOSE_FILE down"
  success "Services stopped."
}

########################
# CLEANUP
########################
cleanup() {
  warn "Performing Docker cleanup..."
  run_cmd "docker container prune -f"
  run_cmd "docker image prune -f"
  run_cmd "docker volume prune -f"
  run_cmd "docker network prune -f"
  success "Cleanup done."
}

########################
# ARGUMENT HANDLING
########################
if [[ $# -eq 0 ]]; then
  error "No argument provided. Use: build | deploy | build-deploy | down"
fi

case "$1" in
  build)
    controlled_build
    ;;

  deploy)
    deploy
    ;;

  build-deploy)
    controlled_build
    deploy
    ;;

  down)
    down
    cleanup
    ;;

  *)
    error "Invalid argument: $1"
    ;;
esac
