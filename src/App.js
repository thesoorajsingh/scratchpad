import "./styles.css";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const data = [
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text"
  ];

  const WhiteBox = ({ children }) => (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid black",
        padding: "1rem",
        width: "fit-content"
      }}
    >
      {children}
    </div>
  );

  const noOverflowStyles = {
    overflow: "hidden"
  };

  const showOverflorStyles = {
    display: "flex",
    gap: "10px",
    overflow: "scroll"
  };

  const someDate = null;

  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollRef = useRef(null);
  const scrollBarRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    setMaxScroll(container.scrollWidth - container.clientWidth);
  }, []);

  useEffect(() => {
    console.log((scroll / maxScroll) * 100);
    let scrollDistance = (scroll / maxScroll) * 100;
    scrollBarRef.current.style.left = `${
      scrollDistance > 25 ? scrollDistance - 9 : scrollDistance
    }%`;
  }, [scroll]);

  const handleScroll = () => {
    const leftScroll = scrollRef.current.scrollLeft;
    setScroll(leftScroll);
  };

  const ScrollIndicator = ({ scroll, maxScroll }) => {
    const indicatorWidth = 100 * (scroll / maxScroll);

    return (
      <div className="horizontal-scroll-indicator">
        <div
          className="indicator-bar"
          style={{ width: `${indicatorWidth}%` }}
        />
        <div className="scroll-text">Scrolled {scroll} px</div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div
            style={{
              backgroundColor: "green",
              width: "300px",
              height: "25px",
              position: "relative",
              borderRadius: "20px"
            }}
          >
            <div
              style={{
                width: "25px",
                height: "100%",
                backgroundColor: "red",
                position: "absolute",
                left: 0,
                zIndex: 2,
                borderRadius: "inherit"
              }}
              ref={scrollBarRef}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="overflow-hidden" style={noOverflowStyles}>
        <div
          className="overflow-shown"
          ref={scrollRef}
          style={showOverflorStyles}
          onScroll={handleScroll}
        >
          {data.map((message) => (
            <WhiteBox>{message}</WhiteBox>
          ))}
        </div>
      </div>
      <ScrollIndicator scroll={scroll} maxScroll={maxScroll} />
    </div>
  );
}
