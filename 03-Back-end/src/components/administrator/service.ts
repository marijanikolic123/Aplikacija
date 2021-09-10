import AdministratorModel from './model';
import IModelAdapterOptions from '../../common/IModelAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import { IAddAdministrator } from './dto/IAddAdministrator';
import IErrorResponse from '../../common/IErrorResponse.interface';
import * as bcrypt from "bcrypt";

class AdministratorModelAdapterOptions implements IModelAdapterOptions { }

class AdministratorService extends BaseService<AdministratorModel> {
    protected async adaptModel(
        data: any,
        options: Partial<AdministratorModelAdapterOptions>
    ): Promise<AdministratorModel> {
        const item = new AdministratorModel();

        item.administratorId = +(data?.administrator_id);
        item.username        =   data?.username;
        item.passwordHash    =   data?.password_hash;
        item.isActive        = +(data?.is_active) === 1;

        return item;
    }

    public async getAll(): Promise<AdministratorModel[]> {
        return await this.getAllFromTable("administrator", {}) as AdministratorModel[];
    }

    public async getById(administratorId: number): Promise<AdministratorModel|null> {
        return await this.getByIdFromTable("administrator", administratorId, {}) as AdministratorModel|null;
    }

    public async add(data: IAddAdministrator): Promise<AdministratorModel|IErrorResponse> {
        return new Promise<AdministratorModel|IErrorResponse>(async resolve => {
          
            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(
                `INSERT administrator SET username = ?, password_hash = ?, is_active = 1;`,
                [
                    data.username,
                    passwordHash,
                ]
            )
            .then(async res => {
                const newAdministratorId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(newAdministratorId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }
}

export default AdministratorService;
