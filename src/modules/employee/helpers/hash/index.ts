import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';

const saltRounds = 10;

const hashPasswordHook = async (
  params: CreateEmployeeDto,
): Promise<CreateEmployeeDto> => {
  if (params.password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(params.password, salt);
    return {
      ...params,
      password: hash,
    };
  }
  return params;
};

export default hashPasswordHook;
