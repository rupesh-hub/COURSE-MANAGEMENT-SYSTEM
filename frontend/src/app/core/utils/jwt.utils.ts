export interface DecodedToken {
  sub?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export class JwtUtils {
  
  static decode(token: string): DecodedToken | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const decoded = JSON.parse(atob(parts[1]));
      return decoded;
    } catch (error) {
      console.error('[JwtUtils] Error decoding token:', error);
      return null;
    }
  }

  static isExpired(token: string, bufferSeconds = 300): boolean {
    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const bufferTime = bufferSeconds * 1000;

    return currentTime >= expirationTime - bufferTime;
  }

  static getExpirationDate(token: string): Date | null {
    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) {
      return null;
    }

    return new Date(decoded.exp * 1000);
  }

  static getRemainingTime(token: string): number {
    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) {
      return 0;
    }

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const remainingTime = expirationTime - currentTime;

    return Math.max(remainingTime, 0);
  }

  static getClaim(token: string, claimName: string): any {
    const decoded = this.decode(token);
    return decoded ? decoded[claimName] : null;
  }
}
