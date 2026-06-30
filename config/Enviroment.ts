// RETO 9

declare const process: { env: Record<string, string | undefined> }

export class Enviroment {
    // Login with admin user
    static readonly ADMIN_USERNAME = Enviroment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Enviroment.getRequired('ADMIN_PASSWORD')

    // Login with employee user
    static readonly EMPLOYEE_USERNAME = Enviroment.getRequired('EMPLOYEE_USERNAME')
    static readonly EMPLOYEE_PASSWORD = Enviroment.getRequired('EMPLOYEE_PASSWORD')

    //Login with admin user with error
    static readonly ADMINERROR_USERNAME = Enviroment.getRequired('ADMINERROR_USERNAME')
    static readonly ADMINERROR_PASSWORD = Enviroment.getRequired('ADMINERROR_PASSWORD')

    private static getRequired(key: string) : string {
        const value = process.env[key]

        if (!value) {
            throw new Error('Enviroment variable ' + key + ' does not exist or is empty')
        }
        return value
    }
}
