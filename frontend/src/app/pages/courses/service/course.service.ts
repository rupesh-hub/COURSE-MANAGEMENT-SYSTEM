import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import type { Comment, Course, CourseDetail, Instructor } from "../model/course.model"

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([])
  public courses$ = this.coursesSubject.asObservable()

  private wishlistSubject = new BehaviorSubject<string[]>([])
  public wishlist$ = this.wishlistSubject.asObservable()

  private enrolledCoursesSubject = new BehaviorSubject<string[]>([])
  public enrolledCourses$ = this.enrolledCoursesSubject.asObservable()

  private courseDetailsMap = new Map<string, CourseDetail>()
  private commentsMap = new Map<string, Comment[]>()
  private userRatings = new Map<string, { courseId: string; rating: number; review: string }>()

  constructor() {
    this.loadMockCourses()
    this.initializeCourseDetails()
  }

  private loadMockCourses(): void {
    const instructors: Record<string, Instructor> = {
      jonas: {
        id: 1,
        username: "jonas.schmedtmann",
        email: "jonas@example.com",
        firstname: "Jonas",
        lastname: "Schmedtmann",
        phone: "+1 555-1234",
        bio: "Full-stack web developer and instructor.",
        isActive: true,
        profile: {
          id: 101,
          path: "https://photoswala.net/wp-content/uploads/2025/04/cute-simple-girl-pic_8.jpg",
          name: "jonas.jpg",
          type: "image/jpeg",
          size: 120394,
        },
      },

      maximilian: {
        id: 2,
        username: "maximilian.schwarzmuller",
        email: "max@example.com",
        firstname: "Maximilian",
        lastname: "Schwarzmüller",
        phone: "+1 555-5678",
        bio: "Passionate Angular & React developer and instructor.",
        isActive: true,
        profile: {
          id: 101,
          path: "https://photoswala.net/wp-content/uploads/2025/04/cute-simple-girl-pic_8.jpg",
          name: "jonas.jpg",
          type: "image/jpeg",
          size: 120394,
        },
      },

      jose: {
        id: 3,
        username: "jose.portilla",
        email: "jose@example.com",
        firstname: "Jose",
        lastname: "Portilla",
        phone: "+1 555-2468",
        bio: "Data science and Python expert.",
        isActive: true,
        profile: {
          id: 101,
          path: "https://photoswala.net/wp-content/uploads/2025/04/cute-simple-girl-pic_8.jpg",
          name: "jonas.jpg",
          type: "image/jpeg",
          size: 120394,
        },
      },

      stephen: {
        id: 4,
        username: "stephen.grider",
        email: "stephen@example.com",
        firstname: "Stephen",
        lastname: "Grider",
        phone: "+1 555-3579",
        bio: "Professional TypeScript & JavaScript instructor.",
        isActive: true,
        profile: {
          id: 101,
          path: "https://photoswala.net/wp-content/uploads/2025/04/cute-simple-girl-pic_8.jpg",
          name: "jonas.jpg",
          type: "image/jpeg",
          size: 120394,
        },
      },

      brad: {
        id: 5,
        username: "brad.traversy",
        email: "brad@example.com",
        firstname: "Brad",
        lastname: "Traversy",
        phone: "+1 555-9876",
        bio: "Web designer & full-stack instructor.",
        isActive: true,
        profile: {
          id: 101,
          path: "https://photoswala.net/wp-content/uploads/2025/04/cute-simple-girl-pic_8.jpg",
          name: "jonas.jpg",
          type: "image/jpeg",
          size: 120394,
        },
      },
    }

    const mockCourses: Course[] = [
      {
        id: "1",
        title: "The Complete JavaScript Course 2024",
        instructor: instructors["jonas"],
        description: "Master JavaScript from basics to advanced concepts",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        price: 14.99,
        originalPrice: 79.99,
        rating: 4.8,
        reviews: 1250000,
        students: 3000000,
        duration: 69,
        totalDuration: 4140,
        level: "Beginner",
        category: "Web Development",
        language: "English",
        isBestseller: true,
        isPublished: true,
        createdOn: "2024-01-10T12:00:00Z",
        lessons: [],
        isWishlisted: false,
      },
      {
        id: "2",
        title: "Angular - The Complete Guide",
        instructor: instructors["maximilian"],
        description: "Learn Angular from scratch and build amazing web apps",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
        price: 12.99,
        originalPrice: 89.99,
        rating: 4.7,
        reviews: 580000,
        students: 1500000,
        duration: 40,
        totalDuration: 2400,
        level: "Intermediate",
        category: "Web Development",
        language: "English",
        isBestseller: true,
        isPublished: true,
        createdOn: "2024-03-21T12:00:00Z",
        lessons: [],
        isWishlisted: false,
      },
      {
        id: "3",
        title: "React - The Complete Guide",
        instructor: instructors["maximilian"],
        description: "Master React, Hooks, Context API, React Router, and more",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        price: 14.99,
        originalPrice: 84.99,
        rating: 4.9,
        reviews: 2100000,
        students: 4500000,
        duration: 49,
        totalDuration: 2940,
        level: "Intermediate",
        category: "Web Development",
        language: "English",
        isBestseller: true,
        isPublished: true,
        createdOn: "2024-04-05T12:00:00Z",
        lessons: [],
        isWishlisted: false,
      },
      {
        id: "4",
        title: "Python for Data Science and Machine Learning",
        instructor: instructors["jose"],
        description: "Learn Python and ML algorithms with real-world projects",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
        price: 13.99,
        originalPrice: 94.99,
        rating: 4.6,
        reviews: 890000,
        students: 2200000,
        duration: 22,
        totalDuration: 1320,
        level: "Intermediate",
        category: "Data Science",
        language: "English",
        isBestseller: false,
        isPublished: true,
        createdOn: "2024-05-12T12:00:00Z",
        lessons: [],
        isWishlisted: false,
      },
      {
        id: "5",
        title: "Advanced TypeScript Masterclass",
        instructor: instructors["stephen"],
        description: "Master advanced TypeScript concepts and patterns",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
        price: 11.99,
        originalPrice: 79.99,
        rating: 4.8,
        reviews: 450000,
        students: 1100000,
        duration: 25,
        totalDuration: 1500,
        level: "Advanced",
        category: "Web Development",
        language: "English",
        isBestseller: true,
        isPublished: true,
        createdOn: "2024-06-01T12:00:00Z",
        lessons: [],
        isWishlisted: false,
      },
      {
        id: "6",
        title: "Web Design for Beginners",
        instructor: instructors["brad"],
        description: "Learn modern web design principles and tools",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
        price: 9.99,
        originalPrice: 59.99,
        rating: 4.7,
        reviews: 320000,
        students: 800000,
        duration: 18,
        totalDuration: 1080,
        level: "Beginner",
        category: "Design",
        language: "English",
        isBestseller: false,
        isPublished: true,
        createdOn: "2024-07-18T12:00:00Z",
        lessons: [],
        isWishlisted: false,
      },
    ]

    this.coursesSubject.next(mockCourses)
  }

  private initializeCourseDetails(): void {
    const courseDetail: CourseDetail = {
      id: "3",
      title: "React - The Complete Guide",
      instructor: {
        id: 1,
        username: "maximilian77",
        email: "max@example.com",
        firstname: "Maximilian",
        lastname: "Schwarzmüller",
        phone: "+49123456789",
        bio: "Web developer and educator with 15+ years of experience.",
        isActive: true,
        profile: {
          id: 1,
          path: "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
          name: "max-profile.jpg",
          type: "image/jpeg",
          size: 150350,
        },
      },
      description: "Master React, Hooks, Context API, React Router, and more",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      price: 14.99,
      originalPrice: 84.99,
      rating: 4.9,
      reviews: 2100000,
      students: 4500000,
      duration: 49,
      level: "Intermediate",
      category: "Web Development",
      language: "English",
      isBestseller: true,
      isPublished: true,
      totalDuration: 2940,
      createdOn: "2025-11-28T19:36:01.586987",
      studentCount: 4500000,
      lessons: [
        {
          id: 1,
          title: "React Fundamentals",
          description: "Learn React components, props, and state management basics.",
          content: "In this lesson, we explore core React concepts...",
          videoUrl: "https://example.com/videos/react-fundamentals.mp4",
          duration: 45,
          sequenceOrder: 1,
          isPublished: true,
        },
        {
          id: 2,
          title: "Hooks Deep Dive",
          description: "Master React Hooks including useState, useEffect, and custom hooks.",
          content: "We explore the Hooks API in detail...",
          videoUrl: "https://example.com/videos/hooks-dive.mp4",
          duration: 60,
          sequenceOrder: 2,
          isPublished: true,
        },
        {
          id: 3,
          title: "Context API & State Management",
          description: "Learn Context API for global state management.",
          content: "We implement Context API for complex applications...",
          videoUrl: "https://example.com/videos/context-api.mp4",
          duration: 55,
          sequenceOrder: 3,
          isPublished: true,
        },
      ],
      comments: [
        {
          id: 1,
          author: "John Developer",
          avatar: "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
          rating: 5,
          text: "Excellent course! The instructor explains React concepts in a very clear and comprehensive way.",
          date: "2 weeks ago",
          helpful: 24,
        },
        {
          id: 2,
          author: "Sarah Engineer",
          avatar: "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
          rating: 4,
          text: "Very well structured course. Great for intermediate developers.",
          date: "1 month ago",
          helpful: 15,
        },
      ],
    }

    this.courseDetailsMap.set("3", courseDetail)
    this.commentsMap.set("3", courseDetail.comments)
  }

  getCourses(): Observable<Course[]> {
    return this.courses$
  }

  searchCourses(query: string): Observable<Course[]> {
    return new Observable((observer) => {
      const courses = this.coursesSubject.value
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.firstname.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase()),
      )
      observer.next(filtered)
      observer.complete()
    })
  }

  toggleWishlist(courseId: string): void {
    const courses = this.coursesSubject.value
    const updated = courses.map((course) =>
      course.id === courseId ? { ...course, isWishlisted: !course.isWishlisted } : course,
    )
    this.coursesSubject.next(updated)
  }

  getCourseDetail(courseId: string): Observable<CourseDetail> {
    return new Observable((observer) => {
      const detail = this.courseDetailsMap.get(courseId)
      if (detail) {
        observer.next(detail)
      } else {
        const course = this.coursesSubject.value.find((c) => c.id === courseId)
        if (course) {
          const detailData: CourseDetail = {
            ...course,
            instructor: {
              id: 1,
              username: course.instructor.firstname.toLowerCase().replace(/\s+/g, ""),
              email: `${course.instructor.firstname.toLowerCase()}@example.com`,
              firstname: course.instructor.firstname.split(" ")[0],
              lastname: course.instructor.firstname.split(" ")[1] || "",
              phone: "+1234567890",
              bio: `Experienced instructor specializing in ${course.category}`,
              isActive: true,
            },
            lessons: [],
            comments: [],
            createdOn: new Date().toISOString(),
            totalDuration: course.duration * 60,
            isPublished: true,
            studentCount: course.students,
          }
          observer.next(detailData)
        }
      }
      observer.complete()
    })
  }

  getCourseComments(courseId: string): Observable<Comment[]> {
    return new Observable((observer) => {
      const comments = this.commentsMap.get(courseId) || []
      observer.next(comments)
      observer.complete()
    })
  }

  addComment(courseId: string, comment: Omit<Comment, "id">): Observable<Comment> {
    return new Observable((observer) => {
      const comments = this.commentsMap.get(courseId) || []
      const newComment: Comment = {
        ...comment,
        id: comments.length + 1,
      }
      comments.unshift(newComment)
      this.commentsMap.set(courseId, comments)
      observer.next(newComment)
      observer.complete()
    })
  }

  rateAndReviewCourse(
    courseId: string,
    rating: number,
    review: string,
  ): Observable<{ courseId: string; rating: number; review: string }> {
    return new Observable((observer) => {
      this.userRatings.set(courseId, { courseId, rating, review })
      observer.next({ courseId, rating, review })
      observer.complete()
    })
  }

  getUserRating(courseId: string): Observable<{ courseId: string; rating: number; review: string } | null> {
    return new Observable((observer) => {
      observer.next(this.userRatings.get(courseId) || null)
      observer.complete()
    })
  }

  getCoursesByCategory(category: string): Observable<Course[]> {
    return new Observable((observer) => {
      const filtered = this.coursesSubject.value.filter((c) => c.category === category)
      observer.next(filtered)
      observer.complete()
    })
  }

  getCoursesByLevel(level: string): Observable<Course[]> {
    return new Observable((observer) => {
      const filtered = this.coursesSubject.value.filter((c) => c.level === level)
      observer.next(filtered)
      observer.complete()
    })
  }

  getTrendingCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      const trending = this.coursesSubject.value
        .filter((c) => c.isBestseller)
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 6)
      observer.next(trending)
      observer.complete()
    })
  }

  getFeaturedCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      const featured = this.coursesSubject.value.filter((c) => c.rating >= 4.7).slice(0, 8)
      observer.next(featured)
      observer.complete()
    })
  }

  addToWishlist(courseId: string): void {
    const wishlist = this.wishlistSubject.value
    if (!wishlist.includes(courseId)) {
      this.wishlistSubject.next([...wishlist, courseId])
      const courses = this.coursesSubject.value.map((c) => (c.id === courseId ? { ...c, isWishlisted: true } : c))
      this.coursesSubject.next(courses)
    }
  }

  removeFromWishlist(courseId: string): void {
    const wishlist = this.wishlistSubject.value.filter((id) => id !== courseId)
    this.wishlistSubject.next(wishlist)
    const courses = this.coursesSubject.value.map((c) => (c.id === courseId ? { ...c, isWishlisted: false } : c))
    this.coursesSubject.next(courses)
  }

  getWishlistCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      const wishlist = this.wishlistSubject.value
      const wishlistCourses = this.coursesSubject.value.filter((c) => wishlist.includes(c.id))
      observer.next(wishlistCourses)
      observer.complete()
    })
  }

  enrollCourse(courseId: string): Observable<{ success: boolean; message: string }> {
    return new Observable((observer) => {
      const enrolled = this.enrolledCoursesSubject.value
      if (!enrolled.includes(courseId)) {
        this.enrolledCoursesSubject.next([...enrolled, courseId])
        observer.next({ success: true, message: "Successfully enrolled in the course" })
      } else {
        observer.next({ success: false, message: "Already enrolled in this course" })
      }
      observer.complete()
    })
  }

  getEnrolledCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      const enrolled = this.enrolledCoursesSubject.value
      const enrolledCourses = this.coursesSubject.value.filter((c) => enrolled.includes(c.id))
      observer.next(enrolledCourses)
      observer.complete()
    })
  }

  isEnrolled(courseId: string): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(this.enrolledCoursesSubject.value.includes(courseId))
      observer.complete()
    })
  }

  getRecommendedCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      const enrolled = this.enrolledCoursesSubject.value
      const enrolledCategories = this.coursesSubject.value.filter((c) => enrolled.includes(c.id)).map((c) => c.category)

      const recommended = this.coursesSubject.value
        .filter((c) => enrolledCategories.includes(c.category) && !enrolled.includes(c.id))
        .slice(0, 6)
      observer.next(recommended)
      observer.complete()
    })
  }

  filterCourses(filters: {
    category?: string
    level?: string
    priceRange?: { min: number; max: number }
    minRating?: number
    language?: string
  }): Observable<Course[]> {
    return new Observable((observer) => {
      let filtered = [...this.coursesSubject.value]

      if (filters.category) {
        filtered = filtered.filter((c) => c.category === filters.category)
      }
      if (filters.level) {
        filtered = filtered.filter((c) => c.level === filters.level)
      }
      if (filters.priceRange) {
        filtered = filtered.filter((c) => c.price >= filters.priceRange!.min && c.price <= filters.priceRange!.max)
      }
      if (filters.minRating) {
        filtered = filtered.filter((c) => c.rating >= filters.minRating!)
      }
      if (filters.language) {
        filtered = filtered.filter((c) => c.language === filters.language)
      }

      observer.next(filtered)
      observer.complete()
    })
  }
}
