import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

@ValidatorConstraint({ name: "isEqualsPassword", async: false })
export class IsEqualsPassword implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        const obj: any = args.object;
        return text == obj.password;
    }

    defaultMessage(args: ValidationArguments) {
        return "TODO: Providenciar mensagem de erro";
    }

}