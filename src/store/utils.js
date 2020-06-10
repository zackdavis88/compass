import store from "./store";

export const parseError = (errorResponse) => errorResponse.response.body.error;

export const apiRequest = ({dispatch, types, request, payload}) => {
  return new Promise(resolve => {
    const [REQUEST, SUCCESS, FAILURE] = types;
    const apiToken = store.getState().auth.token;
    if(apiToken)
      request = request.set("x-compass-token", apiToken);
    
    if(payload)
      request = request.send(payload);
  
    dispatch({type: REQUEST});
    request
    .then(response => {
      dispatch({type: SUCCESS, response});
      resolve(response.body);
    })
    .catch(err => {
      dispatch({type: FAILURE, err});
      resolve(err.response.body);
    });
  });
};
