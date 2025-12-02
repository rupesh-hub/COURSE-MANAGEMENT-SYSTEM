export interface ErrorDetails {
  status: number;
  message: string;
  details?: any;
  timestamp: Date;
}

export class ErrorHandler {
  static handleHttpError(error: any): ErrorDetails {
    const details: ErrorDetails = {
      status: error?.status || 0,
      message: error?.error?.message || 'An unexpected error occurred',
      details: error,
      timestamp: new Date(),
    };

    console.error('[ErrorHandler]', details);
    return details;
  }

  static getErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.message) {
      return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  }

  static isNetworkError(error: any): boolean {
    return error?.status === 0 || error?.status === null;
  }

  static isUnauthorized(error: any): boolean {
    return error?.status === 401;
  }

  static isForbidden(error: any): boolean {
    return error?.status === 403;
  }

  static isNotFound(error: any): boolean {
    return error?.status === 404;
  }

  static isServerError(error: any): boolean {
    return error?.status >= 500;
  }
}
