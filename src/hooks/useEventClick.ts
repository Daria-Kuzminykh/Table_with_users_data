import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from "../constants";


function useEventClick() {
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        history.push(PATHS.table);
      }
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [history]);

  return ref;
}

export default useEventClick;
