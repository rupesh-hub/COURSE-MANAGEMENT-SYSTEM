import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "cms-account-settings",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./account-settings.component.html",
  styleUrl: "./account-settings.component.scss",
})
export class AccountSettingsComponent implements OnInit {
  activeTab = "profile"
  accountForm!: FormGroup
  passwordForm!: FormGroup
  isSaving = false
  successMessage = ""
  errorMessage = ""

  userProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-234-567-8900",
    bio: "Passionate learner and developer",
    website: "https://johndoe.com",
    country: "United States",
    avatar: "/abstract-profile.png",
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForms()
  }

  initializeForms(): void {
    this.accountForm = this.fb.group({
      firstName: [this.userProfile.firstName, Validators.required],
      lastName: [this.userProfile.lastName, Validators.required],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phone: [this.userProfile.phone],
      bio: [this.userProfile.bio],
      website: [this.userProfile.website],
      country: [this.userProfile.country],
    })

    this.passwordForm = this.fb.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordsMatch },
    )
  }

  passwordsMatch(group: FormGroup): { [key: string]: any } | null {
    const newPassword = group.get("newPassword")?.value
    const confirmPassword = group.get("confirmPassword")?.value
    return newPassword === confirmPassword ? null : { passwordMismatch: true }
  }

  switchTab(tab: string): void {
    this.activeTab = tab
    this.successMessage = ""
    this.errorMessage = ""
  }

  saveProfile(): void {
    if (this.accountForm.invalid) {
      this.errorMessage = "Please fill in all required fields correctly"
      return
    }

    this.isSaving = true
    setTimeout(() => {
      this.userProfile = { ...this.accountForm.value, avatar: this.userProfile.avatar }
      this.isSaving = false
      this.successMessage = "Profile updated successfully!"
      setTimeout(() => (this.successMessage = ""), 3000)
    }, 1500)
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.errorMessage = "Please check your password inputs"
      return
    }

    this.isSaving = true
    setTimeout(() => {
      this.isSaving = false
      this.successMessage = "Password changed successfully!"
      this.passwordForm.reset()
      setTimeout(() => (this.successMessage = ""), 3000)
    }, 1500)
  }

  uploadAvatar(event: any): void {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        this.userProfile.avatar = reader.result as string
        this.successMessage = "Avatar updated successfully!"
        setTimeout(() => (this.successMessage = ""), 3000)
      }
      reader.readAsDataURL(file)
    }
  }
}
