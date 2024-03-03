import axios from 'axios';
import React, { useState } from 'react';

const RenderPlaylists = () => {
  const [playlist, setPlaylists] = useState<[]>([]);

  // React.useEffect(() => {
  //   axios.get('http://127.0.0.1:3001/fetch/youtube').then((response) => {
  //     setPlaylists(response.data);
  //   });
  // }, []);

  return (
    <div>
      {playlist.map((playlist: any) => {
        return (
          <>
            <>{playlist.title}</>
            <>{playlist.description}</>
          </>
        );
      })}
    </div>
  );
};

export default RenderPlaylists;
