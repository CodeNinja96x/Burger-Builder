import React, {  useEffect  } from 'react';
import './activityOverlay.scss';
import { Spinner} from 'react-bootstrap';

function ActivityOverlay(props: any) {

    useEffect(() => {
     
    }, []);

    return (
        <>
         <div className="activityOverlay">
             <div className="activityOverlayInner"></div>
            <Spinner className="spinner" animation="border" variant="success" />
         </div>      
        </>
    )

}

export default ActivityOverlay;