
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function LoadingOverlay() {
    const { t } = useTranslation();
    const loadingText = t('components.loadingoverlay.text_loading');


    /********loading functinality for api call depent on reducer*********/
    const reducerState = useSelector((state) => (state));
    const getIsLoadingValue = useMemo(() => {
        for (const reducer in reducerState) {  //  for in loop to iterate object
            if (reducerState[reducer].isLoading === true) {
                return true
            }
        }
        return false
    }, [reducerState])


    return (
        <>
            {getIsLoadingValue &&
                <div className="loadingOverlay">
                    <div className="loadingOverlay__background" />
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="sr-only">Loading...</p>
                    </div>
                </div>
            }
        </>
    );
}

export default LoadingOverlay