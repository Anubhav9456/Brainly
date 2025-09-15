export {}; // This ensures the file is treated as a module, avoiding global scope conflicts.


declare global {
    namespace Express {
        
        export interface Request {
            userId?: string; 
        }
    }
}