export declare enum Role {
    User = "user",
    Admin = "admin",
    Unknown = "unknown"
}
export declare const ROLES_KEY = "ROLES";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
