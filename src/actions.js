import {UPDATE_TITLE,
UPDATE_DESCRIPTION,
UPDATE_EMAIL,
FETCHING_STATUSES,
SAVE_SUCCESS,
SAVE_DATA,
VALIDATE} from './constants';

export const changeEmail = (email) => ({
  type: UPDATE_EMAIL,
  email
})

export const changeTitle = ({target}) => ({
  type: UPDATE_TITLE,
  title: target.value
})

export const changeDescription = ({target}) => ({
  type: UPDATE_DESCRIPTION,
  description: target.value
});

const validate = () => ({
  type: VALIDATE
});


const saveSuccess = () => ({
  type: SAVE_SUCCESS
});

const saveData = () => ({
  type: SAVE_DATA
});

const present = (state, action) => {

}

const machine = {
  [FETCHING_STATUSES.IDLE]: {
    // VALIDATE: FETCHING_STATUSES.IDLE,
    SAVE_DATA: FETCHING_STATUSES.SAVING
  },
  [FETCHING_STATUSES.SAVING]: {
    SAVE_SUCCESS: FETCHING_STATUSES.IDLE,
    SAVE_ERROR: FETCHING_STATUSES.ERROR
  },
  [FETCHING_STATUSES.ERROR]: {
    SAVE_DATA: FETCHING_STATUSES.SAVING
  }
};

function transition(currentState, action) {
  return machine[currentState][action];
}


export const sendData = currentState =>  (dispatch, getState)=> {
  const nextState = transition(currentState, SAVE_DATA);
  console.log(nextState)
  dispatch(validate())
  if(nextState){
      dispatch(saveData())
      setTimeout(()=>{
        console.log('saving --->>>>>')
        dispatch(saveSuccess())
      }, 1000)
  
  }
}