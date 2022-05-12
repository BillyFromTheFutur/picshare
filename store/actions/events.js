import Event from '../../models/event';

export const SET_EVENTS = 'SET_EVENTS';

const secret = 'ZUbpODZ90l^M;dg*V=$ctnXdspaRz#,iDJwou<Adql';

export const fetchEvents = () => {
  console.log('-----    FETCH EVENTS    -----');
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch('https://picnshare.fr/api/v1/events/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          secret: secret,
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorResData);
      }

      const resData = await response.json();
      const loadedEvents = [];

      if (resData.status === 'FAILED') {
        throw new Error(resData.message);
      }

      if (resData.status !== 'SUCCESS') {
        throw new Error('Erreur inconnue : ', resData);
      }

      if (resData.status === 'SUCCESS') {
        for (const key in resData.Events) {
          loadedEvents.push(
            new Event(
              resData.Events[key].Ev_id,
              resData.Events[key].Ev_Nom,
              resData.Events[key].Ev_Datdeb,
              resData.Events[key].Ev_Datefin,
              resData.Events[key].Ev_Actif,
              resData.Events[key].Ev_Private,
              resData.Events[key].Ev_Key
            )
          );
        }
      }

      dispatch({
        type: SET_EVENTS,
        events: loadedEvents
      });
    } catch (error) {
      throw err;
    }
  };
};
