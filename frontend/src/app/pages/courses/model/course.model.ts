export interface Course {
  totalDuration: number
  isPublished: boolean
  createdOn: string
  lessons: Lesson[]
  id: string
  title: string
  instructor: Instructor
  description: string
  thumbnail: string
  price: number
  originalPrice: number
  rating?: number
  reviews: number
  students: number
  duration: number
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  language: string
  isBestseller: boolean
  isWishlisted?: boolean
}

export interface Comment {
  id: number
  author: string
  avatar: string
  rating: number
  text: string
  date: string
  helpful: number
}

export interface Lesson {
  id: number
  title: string
  description: string
  content: string
  videoUrl: string
  duration: number
  sequenceOrder: number
  isPublished: boolean
}

export interface Instructor {
  id: number
  username: string
  email: string
  firstname: string
  lastname: string
  phone: string
  bio: string
  isActive: boolean
  profile?: {
    id: number
    path: string
    name: string
    type: string
    size: number
  }
}

export interface CourseDetail extends Course {
  instructor: Instructor
  lessons: Lesson[]
  comments: Comment[]
  studentCount?: number
}

export interface FileInfo {
  id: number
  path: string
  name: string
  type: string
  size: number
}
