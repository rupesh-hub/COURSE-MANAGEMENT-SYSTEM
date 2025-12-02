import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile, UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/auth/auth.service';

interface DashboardStats {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
}

interface RecentActivity {
  id: string;
  type: string;
  course: string;
  timestamp: Date;
  progress: number;
  icon: string;
}

@Component({
  selector: 'cms-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent implements OnInit {
  userProfile: UserProfile | null = null;
  stats: DashboardStats[] = [];
  recentActivities: RecentActivity[] = [];
  enrolledCourses: any[] = [];
  recommendedCourses: any[] = [];
  streakDays = 45;
  lastActive: Date = new Date();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.profile$.subscribe((profile) => {
      this.userProfile = profile;
      this.initializeDashboard();
    });
  }

  private initializeDashboard(): void {
    if (!this.userProfile) return;

    this.stats = [
      {
        title: 'Total Courses',
        value: this.userProfile.totalCoursesEnrolled,
        icon: 'fas fa-book',
        color: 'bg-sage-light',
        trend: '+2 this month',
      },
      {
        title: 'Completed',
        value: this.userProfile.completedCourses,
        icon: 'fas fa-check-circle',
        color: 'bg-green-100',
        trend: '+1 this week',
      },
      {
        title: 'In Progress',
        value: this.userProfile.pendingCourses,
        icon: 'fas fa-hourglass-half',
        color: 'bg-amber-100',
        trend: '3 active',
      },
      {
        title: 'Certificates',
        value: this.userProfile.certificates,
        icon: 'fas fa-award',
        color: 'bg-blue-100',
        trend: '+2 this month',
      },
      {
        title: 'Learning Streak',
        value: `${this.streakDays} days`,
        icon: 'fas fa-fire',
        color: 'bg-red-100',
        trend: 'Keep going!',
      },
      {
        title: 'Weekly Hours',
        value: this.userProfile.weeklyStudyHours,
        icon: 'fas fa-clock',
        color: 'bg-purple-100',
        trend: '5h average',
      },
    ];

    this.loadRecentActivities();
    this.loadEnrolledCourses();
    this.loadRecommendedCourses();
  }

  private loadRecentActivities(): void {
    this.recentActivities = [
      {
        id: '1',
        type: 'course_completed',
        course: 'React - The Complete Guide',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        progress: 100,
        icon: 'fas fa-trophy',
      },
      {
        id: '2',
        type: 'certificate_earned',
        course: 'Advanced JavaScript',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        progress: 100,
        icon: 'fas fa-certificate',
      },
      {
        id: '3',
        type: 'lesson_completed',
        course: 'Python for Data Science',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        progress: 65,
        icon: 'fas fa-check',
      },
      {
        id: '4',
        type: 'assignment_submitted',
        course: 'Web Design Fundamentals',
        timestamp: new Date(),
        progress: 45,
        icon: 'fas fa-paper-plane',
      },
      {
        id: '5',
        type: 'milestone_reached',
        course: 'Angular Masterclass',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        progress: 80,
        icon: 'fas fa-star',
      },
    ];
  }

  private loadEnrolledCourses(): void {
    this.enrolledCourses = [
      {
        id: '1',
        title: 'The Complete JavaScript Course 2024',
        instructor: 'Jonas Schmedtmann',
        progress: 85,
        thumbnail:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop',
        rating: 4.8,
        lastAccessed: 'Today',
      },
      {
        id: '2',
        title: 'React - The Complete Guide',
        instructor: 'Maximilian Schwarzmüller',
        progress: 100,
        thumbnail:
          'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=200&fit=crop',
        rating: 4.9,
        lastAccessed: '2 days ago',
      },
      {
        id: '3',
        title: 'Python for Data Science',
        instructor: 'Jose Portilla',
        progress: 65,
        thumbnail:
          'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=300&h=200&fit=crop',
        rating: 4.6,
        lastAccessed: '1 day ago',
      },
      {
        id: '4',
        title: 'Angular - The Complete Guide',
        instructor: 'Maximilian Schwarzmüller',
        progress: 45,
        thumbnail:
          'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=200&fit=crop',
        rating: 4.7,
        lastAccessed: '3 days ago',
      },
    ];
  }

  private loadRecommendedCourses(): void {
    this.recommendedCourses = [
      {
        id: '1',
        title: 'TypeScript Advanced Patterns',
        instructor: 'Stephen Grider',
        price: 11.99,
        rating: 4.8,
        students: '450K',
        thumbnail:
          'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=200&fit=crop',
      },
      {
        id: '2',
        title: 'Vue.js 3 Comprehensive Course',
        instructor: 'Brad Traversy',
        price: 12.99,
        rating: 4.7,
        students: '320K',
        thumbnail:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop',
      },
      {
        id: '3',
        title: 'GraphQL with Node.js',
        instructor: 'Wes Bos',
        price: 13.99,
        rating: 4.9,
        students: '180K',
        thumbnail:
          'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=300&h=200&fit=crop',
      },
    ];
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  }

  continueLearning(course: any): void {
    console.log('Continuing course:', course.title);
  }

  exploreCourse(course: any): void {
    console.log('Exploring course:', course.title);
  }

  viewAllCourses(): void {
    console.log('View all courses');
  }

  logout(): void {
    this.authService.logout();
  }
}
