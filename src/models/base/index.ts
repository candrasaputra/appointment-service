import _ from 'lodash';
import { StandardError } from 'src/libs/standard-error';

export interface IGenericObject {
    [key: string]: any;
}

interface IModelErrorCode {
    CREATE_DOC_ERROR: string;
    FIND_BY_QUERY_ERROR: string;
    DUPLICATE_DOC_ERROR: string;
    REMOVE_DOC_ERROR: string;
}

const MONGOOSE_DUPLICATE_ERROR_CODE = 11000;

export enum SortEnum {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

export class BaseModel {
    protected model: any;

    protected errorCodes: IModelErrorCode;

    constructor(model: any, errorCodes: IModelErrorCode) {
        this.model = model;
        this.errorCodes = errorCodes;
    }

    public async create(creationData: any): Promise<IGenericObject> {
        const errorContext = { creationData };

        try {
            const doc = await this.model.create(creationData);

            return doc.toJSON();
        } catch (e) {
            if (e.code === MONGOOSE_DUPLICATE_ERROR_CODE) {
                throw new StandardError(
                    this.errorCodes.DUPLICATE_DOC_ERROR,
                    'Could not create duplicated doc',
                    e,
                    errorContext
                );
            }

            throw new StandardError(this.errorCodes.CREATE_DOC_ERROR, 'Create doc model error', e, errorContext);
        }
    }

    public async find(query: IGenericObject, sort = SortEnum.ASCENDING): Promise<IGenericObject[]> {
        const errorContext = { query };

        try {
            const docs: IGenericObject[] = await this.model
                .find(query)
                .sort({ created_at: sort === SortEnum.ASCENDING ? 1 : -1 });

            return _.map(docs, (doc) => {
                return doc.toJSON();
            });
        } catch (e) {
            throw new StandardError(this.errorCodes.FIND_BY_QUERY_ERROR, 'Find doc by id error', e, errorContext);
        }
    }

    public async delete(query: IGenericObject): Promise<any> {
        const errorContext = { query };

        let doc;
        try {
            doc = await this.model.deleteOne(query);
        } catch (e) {
            throw new StandardError(this.errorCodes.REMOVE_DOC_ERROR, 'Could not delete document', e, errorContext);
        }

        return doc;
    }
}
