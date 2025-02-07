// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environement';
// import { tap } from 'rxjs/operators';
// import { UserRoleEnum } from '../enums/user-role.enum';

// interface AuthResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   refresh_token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/auth';

//   constructor(private http: HttpClient) {}

//   login(credentials: {
//     email: string;
//     password: string;
//     role: string;
//   }): Observable<{ access_token: string }> {
//     return this.http
//       .post<{ access_token: string }>(`${this.apiUrl}/login`, credentials)
//       .pipe(
//         tap((response) => {
//           localStorage.setItem('access_token', response.access_token);
//         })
//       );
//   }

//   register(user: {
//     commonFields: {
//       firstname: string;
//       lastname: string;
//       email: string;
//       password: string;
//       role: UserRoleEnum;
//     };
//   }): Observable<void> {
//     return this.http.post<void>(`${this.apiUrl}/signup`, user);
//   }

//   setToken(token: string): void {
//     localStorage.setItem('access_token', token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('access_token');
//   }

//   logout(): void {
//     localStorage.removeItem('access_token');
//   }
// }
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { tap } from 'rxjs/operators';
// // import { UserRoleEnum } from '../enums/user-role.enum';
// // import jwtDecode from 'jwt-decode';

// // interface AuthResponse {
// //   access_token: string;
// //   token_type: string;
// //   expires_in: number;
// //   refresh_token: string;
// // }

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AuthService {
// //   private apiUrl = 'http://localhost:3000/auth';

// //   constructor(private http: HttpClient) {}

// //   /**
// //    * Login a user and store the token
// //    */
// //   login(credentials: {
// //     email: string;
// //     password: string;
// //     role: UserRoleEnum;
// //   }): Observable<{ access_token: string }> {
// //     return this.http
// //       .post<{ access_token: string }>(`${this.apiUrl}/login`, credentials)
// //       .pipe(
// //         tap((response) => {
// //           this.setToken(response.access_token);
// //         })
// //       );
// //   }

// //   /**
// //    * Register a new user
// //    */

// //   register(user: {
// //     commonFields: {
// //       firstname: string;
// //       lastname: string;
// //       email: string;
// //       password: string;
// //       role: UserRoleEnum; // Ensure this is a single value, not the entire enum
// //     };
// //   }): Observable<{ id: number; role: UserRoleEnum }> {
// //     return this.http.post<{ id: number; role: UserRoleEnum }>(
// //       `${this.apiUrl}/signup`,
// //       user
// //     );
// //   }

// //   /**
// //    * Save the token in localStorage
// //    */
// //   setToken(token: string): void {
// //     localStorage.setItem('access_token', token);
// //   }

// //   /**
// //    * Get the stored token
// //    */
// //   getToken(): string | null {
// //     return localStorage.getItem('access_token');
// //   }

// //   /**
// //    * Decode the token and get user details (id, role)
// //    */
// //   getUserFromToken(): { id: number; role: string } | null {
// //     const token = this.getToken();
// //     if (token) {
// //       const decoded: any = jwtDecode.jwtDecode(token);
// //       return { id: decoded.id, role: decoded.role };
// //     }
// //     return null;
// //   }

// //   /**
// //    * Logout the user
// //    */
// //   logout(): void {
// //     localStorage.removeItem('access_token');
// //   }
// // }

// src/app/services/auth.service.ts
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  register(user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token; // Check if token exists
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwtDecode.jwtDecode(token);
      return decoded.role; // Example: Extract role from token payload
    }
    return null;
  }
  getUserId(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwtDecode.jwtDecode(token);
      return decoded.id; // Example: Extract role from token payload
      console.log(decoded.id);
    }
    return null;
  }
}
