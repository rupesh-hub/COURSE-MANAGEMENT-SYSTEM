import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "cms-preferences",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./preferences.component.html",
  styleUrl: "./preferences.component.scss",
})
export class PreferencesComponent implements OnInit {
  learningPace = "flexible"
  contentTypes = {
    video: true,
    articles: true,
    quizzes: false,
    projects: false,
    discussions: true,
  }
  displayPreferences = {
    darkMode: false,
    compactView: false,
    autoPlayVideos: true,
  }

  ngOnInit(): void {
    this.loadPreferences()
  }

  loadPreferences(): void {
    // Load preferences from localStorage or service
    const saved = localStorage.getItem("userPreferences")
    if (saved) {
      const prefs = JSON.parse(saved)
      this.learningPace = prefs.learningPace || "flexible"
      this.contentTypes = { ...this.contentTypes, ...prefs.contentTypes }
      this.displayPreferences = { ...this.displayPreferences, ...prefs.displayPreferences }
    }
  }

  savePreferences(): void {
    const preferences = {
      learningPace: this.learningPace,
      contentTypes: this.contentTypes,
      displayPreferences: this.displayPreferences,
    }
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    alert("Preferences saved successfully!")
  }

  resetToDefault(): void {
    this.learningPace = "flexible"
    this.contentTypes = {
      video: true,
      articles: true,
      quizzes: false,
      projects: false,
      discussions: true,
    }
    this.displayPreferences = {
      darkMode: false,
      compactView: false,
      autoPlayVideos: true,
    }
  }
}
