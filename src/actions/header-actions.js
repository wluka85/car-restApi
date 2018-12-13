import {API_KEY} from '../non-export-data/api-key';
import {getBodiesList} from '../model/body';
import {getBodiesQuery, getModelConfigurationQuery, getModelsQuery} from './apiQueries';
import {getModelSnippettsList} from "../model/carModelSnippet";
import {getCarModel} from "../model/carModel";
import CarModel from "../model/carModel";
import {modelConfigurationHeader} from "./body-jsons";

export const testAction = () => ({
    type: 'TEST_ACTION',
    bodyId: 1,
    bodyName: 'limousine'
});

export const fetchBodiesRequest = () => ({
    type: 'FETCH_BODIES_REQUEST'
});

export const fetchBodiesSuccess = (bodyList) => ({
    type: 'FETCH_BODIES_SUCCESS',
    bodyList
});
export const fetchBodiesFailure = (error) => ({
    type: 'FETCH_BODIES_FAILURE',
    error
});

export const fetchModelsRequest = () => ({
    type: 'FETCH_MODELS_REQUEST'
});

export const fetchModelsSuccess = (modelList) => ({
    type: 'FETCH_MODELS_SUCCESS',
    modelList
});
export const fetchModelsFailure = (error) => ({
    type: 'FETCH_MODELS_FAILURE',
    error
});

export const fetchModelConfigurationSuccess = (modelConfiguration) => ({
    type: 'FETCH_MODEL_CONFIGURATION_SUCCESS',
    modelConfiguration

});

export const fetchModelConfigurationFailure = (error) => ({
    type: 'FETCH_MODEL_CONFIGURATION_FAILURE',
    error
})

export const fetchModelConfigurationRequest = () => ({
    type: "FETCH_MODEL_CONFIGURATION_REQUEST"
});

export const fetchBodyList = () => {
    return dispatch => {
        dispatch(fetchBodiesRequest());
        return fetch(getBodiesQuery)
            .then(res => res.json())
            .then(body => dispatch(fetchBodiesSuccess(getBodiesList(body))))
            .catch(error => dispatch(fetchBodiesFailure(error)));
    }
};

export const fetchModelList = (bodyId) => {
    return dispatch => {
        dispatch(fetchModelsRequest());
        return fetch(getModelsQuery(bodyId))
            .then(res => res.json())
            .then(body => dispatch(fetchModelsSuccess(getModelSnippettsList(body))))
            .catch(error => dispatch(fetchModelsFailure(error)));
    }
};

export const fetchModelConfiguration = (modelId) => {
    return dispatch => {
        dispatch(fetchModelConfigurationRequest());
        return fetch(getModelConfigurationQuery(modelId))
            .then(res => res.json())
            .then(body => dispatch(fetchModelConfigurationImages(getCarModel(body), body._links.image)))
            .catch(error => dispatch(fetchModelConfigurationFailure('Error: Mistake in query')));
    }
};

export const fetchModelConfigurationImages = (carModel, url) => {
    return dispatch => {
        return fetch(url)
            .then(res => res.json())
            .then(body => {
                carModel.interPhoto = body.vehicle.INT1.url;
                carModel.outerPhoto = body.vehicle.EXT020.url;
                dispatch(fetchModelConfigurationSuccess(carModel));
            })
    }
}