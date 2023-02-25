import {useEffect} from 'react';
// import * as action from '../../../redux/products/productsActions';
import { useDispatch } from "react-redux";

function SupportOutsideCheck(ref,supporTextRef,setShowSupport) {
  const dispatch = useDispatch();
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && supporTextRef.current && !supporTextRef.current.contains(event.target)) {
          setShowSupport(false);
          // dispatch(action.clearSearchResult());
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  export default SupportOutsideCheck;