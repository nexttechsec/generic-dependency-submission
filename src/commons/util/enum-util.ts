import {AppError} from "../error/app-error";

export class EnumUtil {
    private constructor() {
        throw new AppError('Class cannot be instantiated');
    }

    static getEnumKeyByEnumValue<T>(enumClass: { [s: string]: T } | ArrayLike<T>, value: string): keyof T | undefined {
        const objValues = Object.values(enumClass);
        const objKeys = Object.keys(enumClass);
        return (objKeys.find((x, index) => objValues[index] === value) as keyof T) ?? undefined;
    }
}
