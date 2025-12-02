import {Component, ElementRef, OnInit, ViewChild} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms"
import {Observable} from "rxjs"
import {UserProfile, UserService} from '../../../core/services/user.service';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef

  profile$!: Observable<UserProfile | null>
  profileForm!: FormGroup
  isEditMode = false
  isLoadingImage = false
  activeTab = "overview" // Add tab navigation for different sections

  stats: Array<{ label: string; value: number; icon: string; color: string }> = []

  certificates: Array<{
    id: string
    name: string
    issueDate: Date
    image: string
  }> = []
  skillBadges: Array<{ name: string; level: string; icon: string }> = []
  recentActivity: Array<{
    action: string
    description: string
    timestamp: Date
    icon: string
  }> = []
  loginHistory: Array<{
    device: string
    location: string
    timestamp: Date
    status: string
  }> = []
  paymentMethods: Array<{
    id: string
    type: string
    lastFour: string
    expiryDate: string
  }> = []

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.profile$ = this.userService.getProfile()
    this.initializeForm()

    this.profile$.subscribe((profile) => {
      if (profile) {
        this.updateFormValues(profile)
        this.updateStats(profile)
        this.loadCertificates()
        this.loadSkillBadges()
        this.loadRecentActivity()
        this.loadLoginHistory()
        this.loadPaymentMethods()
      }
    })
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.pattern(/^[+]?[0-9\s\-()]+$/)],
      bio: ["", Validators.maxLength(500)],
    })
  }

  private updateFormValues(profile: UserProfile): void {
    this.profileForm.patchValue({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio,
    })
  }

  private updateStats(profile: UserProfile): void {
    this.stats = [
      {
        label: "Completed Courses",
        value: profile.completedCourses,
        icon: "fas fa-check-circle",
        color: "sage",
      },
      {
        label: "Pending Courses",
        value: profile.pendingCourses,
        icon: "fas fa-hourglass-half",
        color: "sage-light",
      },
      {
        label: "Certificates",
        value: profile.certificates,
        icon: "fas fa-certificate",
        color: "sage",
      },
      {
        label: "Weekly Study Hours",
        value: profile.weeklyStudyHours,
        icon: "fas fa-clock",
        color: "sage-light",
      },
    ]
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const profile = this.userService.getCurrentProfile()
      if (profile) {
        this.userService
          .updateProfile({
            ...profile,
            ...this.profileForm.value,
          })
          .subscribe(() => {
            this.isEditMode = false
          })
      }
    }
  }

  cancelEdit(): void {
    const profile = this.userService.getCurrentProfile()
    if (profile) {
      this.updateFormValues(profile)
    }
    this.isEditMode = false
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    // if (file && file.startsWith("image/")) {
    //   this.isLoadingImage = true
    //   this.userService.uploadProfileImage(file).subscribe(() => {
    //     this.isLoadingImage = false
    //   })
    // }
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  private loadCertificates(): void {
    this.certificates = [
      {
        id: "1",
        name: "Advanced Angular Development",
        issueDate: new Date(2024, 10, 15),
        image: "fas fa-award",
      },
      {
        id: "2",
        name: "Script Mastery",
        issueDate: new Date(2024, 9, 20),
        image: "fas fa-certificate",
      },
      {
        id: "3",
        name: "Web Development Fundamentals",
        issueDate: new Date(2024, 8, 10),
        image: "fas fa-medal",
      },
    ]
  }

  private loadSkillBadges(): void {
    this.skillBadges = [
      {name: "Angular Expert", level: "Advanced", icon: "fas fa-star"},
      {name: "Script Pro", level: "Advanced", icon: "fas fa-code"},
      {name: "API Integration", level: "Intermediate", icon: "fas fa-plug"},
      {name: "UI/UX Design", level: "Intermediate", icon: "fas fa-palette"},
      {name: "Database Design", level: "Intermediate", icon: "fas fa-database"},
      {name: "DevOps", level: "Beginner", icon: "fas fa-server"},
    ]
  }

  private loadRecentActivity(): void {
    this.recentActivity = [
      {
        action: "Course Completed",
        description: "Advanced Angular Development",
        timestamp: new Date(),
        icon: "fas fa-check-circle",
      },
      {
        action: "Certificate Earned",
        description: "Script Mastery Certificate",
        timestamp: new Date(Date.now() - 86400000),
        icon: "fas fa-award",
      },
      {
        action: "Course Started",
        description: "Web Performance Optimization",
        timestamp: new Date(Date.now() - 172800000),
        icon: "fas fa-play-circle",
      },
      {
        action: "Assignment Submitted",
        description: "Advanced Routing in Angular",
        timestamp: new Date(Date.now() - 259200000),
        icon: "fas fa-file-upload",
      },
    ]
  }

  private loadLoginHistory(): void {
    this.loginHistory = [
      {
        device: "Chrome on Windows",
        location: "Kathmandu, Nepal",
        timestamp: new Date(),
        status: "active",
      },
      {
        device: "Safari on MacOS",
        location: "Kathmandu, Nepal",
        timestamp: new Date(Date.now() - 86400000),
        status: "inactive",
      },
      {
        device: "Chrome Mobile on Android",
        location: "Lalitpur, Nepal",
        timestamp: new Date(Date.now() - 172800000),
        status: "inactive",
      },
    ]
  }

  private loadPaymentMethods(): void {
    this.paymentMethods = [
      {
        id: "1",
        type: "Visa",
        lastFour: "4242",
        expiryDate: "12/25",
      },
      {
        id: "2",
        type: "Mastercard",
        lastFour: "5555",
        expiryDate: "08/26",
      },
    ]
  }

  downloadCertificate(certificateId: string): void {
    console.log("[v0] Downloading certificate:", certificateId)
  }

  removeCertificate(certificateId: string): void {
    this.certificates = this.certificates.filter((c) => c.id !== certificateId)
  }

  removePaymentMethod(methodId: string): void {
    this.paymentMethods = this.paymentMethods.filter((p) => p.id !== methodId)
  }

  revokeDevice(index: number): void {
    this.loginHistory.splice(index, 1)
  }

  enableTwoFactor(): void {
    console.log("[v0] Enabling 2FA")
  }

  changePassword(): void {
    console.log("[v0] Opening change password dialog")
  }

  downloadData(): void {
    console.log("[v0] Downloading user data")
  }

  switchTab(tab: string): void {
    this.activeTab = tab
  }
}
