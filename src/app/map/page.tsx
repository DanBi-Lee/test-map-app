"use client";

import { useEffect, useRef, useState } from "react";

export default function MapPage() {
  let _map = useRef<naver.maps.Map>();
  const [showMapModal, setShowMapModal] = useState(false);

  let currentCoord = useRef<any>();

  let markerStart = useRef<naver.maps.Marker>();
  let markerGoal = useRef<naver.maps.Marker>();

  useEffect(() => {
    if (!naver) return;

    var mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 15,
    };

    _map.current = new naver.maps.Map("map", mapOptions);
    const map = _map.current;

    naver.maps.Event.addListener(map, "click", function (e) {
      setShowMapModal(true);
      currentCoord.current = e.coord;
    });
  }, []);

  return (
    <>
      <script
        async
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_NPC_CLIENT_ID}`}
      ></script>
      <div className="relative">
        <div id="map" className="w-full h-[100vh]" />
        {showMapModal && (
          <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center gap-4">
            <button
              onClick={() => {
                if (!markerStart.current) {
                  markerStart.current = new naver.maps.Marker({
                    position: new naver.maps.LatLng(currentCoord.current),
                    title: "출발지",
                    map: _map.current,
                  });
                } else {
                  markerStart.current.setPosition(currentCoord.current);
                }
                setShowMapModal(false);
              }}
              className="bg-white p-2 rounded-md"
            >
              출발지
            </button>
            <button
              onClick={() => {
                if (!markerGoal.current) {
                  markerGoal.current = new naver.maps.Marker({
                    position: new naver.maps.LatLng(currentCoord.current),
                    title: "도착지",
                    map: _map.current,
                  });
                }
                markerGoal.current.setPosition(currentCoord.current);
                setShowMapModal(false);
              }}
              className="bg-white p-2 rounded-md"
            >
              도착지
            </button>
          </div>
        )}
      </div>
    </>
  );
}
