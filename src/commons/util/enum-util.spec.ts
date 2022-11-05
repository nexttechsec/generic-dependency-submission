import 'jest';
import {EnumUtil} from "./enum-util";
import {AvailableLanguageEnum} from "../../models/dependency-submission-input.model";

describe('EnumUtil', () => {
    it('should cast known value', () => {
        // given
        const input = 'java';

        // when
        const result = EnumUtil.getEnumKeyByEnumValue(AvailableLanguageEnum, input);

        // then
        expect(result).toBeDefined();
        expect(result).toBe('JAVA');
    });

    it('should return undefined when no value is found', () => {
        // given
        const input = 'unknown value'

        // when
        const result = EnumUtil.getEnumKeyByEnumValue(AvailableLanguageEnum, input);

        // then
        expect(result).not.toBeDefined();
    });
});