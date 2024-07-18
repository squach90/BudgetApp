"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [money, setMoney] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const moneyContainerRef = useRef<HTMLDivElement>(null); // Ref for money container

  useEffect(() => {
    adjustFontSize(); // Call adjustFontSize on initial render
    window.addEventListener("resize", adjustFontSize); // Adjust font size on window resize
    return () => {
      window.removeEventListener("resize", adjustFontSize); // Cleanup resize event listener
    };
  }, [money, inputValue]); // Re-run adjustFontSize when money or inputValue changes

  useEffect(() => {
    // Fetch savedMoney from localStorage on mount
    const savedMoney = localStorage.getItem("savedMoney");
    if (savedMoney) {
      setMoney(parseFloat(savedMoney));
    }
  }, []);

  const adjustFontSize = () => {
    if (moneyContainerRef.current) {
      const container = moneyContainerRef.current;
      const margin = 10; // Margin in pixels
      const desiredWidth = container.offsetWidth - 2 * margin; // Width of the container minus left and right margin

      const moneyElement = container.querySelector(
        "#money-text"
      ) as HTMLElement | null; // Cast to HTMLElement

      if (moneyElement) {
        let fontSize = 100; // Initial font size, adjust as needed
        moneyElement.style.fontSize = `${fontSize}px`; // Set initial font size

        // Check if the money text width exceeds the container width with margin
        while (moneyElement.offsetWidth > desiredWidth && fontSize > 0) {
          fontSize--;
          moneyElement.style.fontSize = `${fontSize}px`;
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 4 && /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleAddMoney = () => {
    const valueToAdd = parseFloat(inputValue);
    if (!isNaN(valueToAdd)) {
      const newMoney = money + valueToAdd;
      setMoney(newMoney);
      localStorage.setItem("savedMoney", newMoney.toString());
    }
    setInputValue("");
  };

  const resetMoney = () => {
    setMoney(0);
    localStorage.removeItem("savedMoney");
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <div id="Solde" className="mb-10">
        <div
          ref={moneyContainerRef}
          style={{
            width: 350,
            height: 183,
            position: "relative",
            background: "rgba(96.78, 96.78, 96.78, 0)",
            textAlign: "center", // Center the content horizontally
          }}
        >
          <div
            style={{
              width: 350,
              height: 183,
              position: "absolute",
              background: "rgba(117.40, 117.40, 117.40, 0.50)",
              borderRadius: 25,
              border: "1px rgba(255, 255, 255, 0.10) solid",
              backdropFilter: "blur(25.80px)",
            }}
          />
          <div
            id="money-text"
            style={{
              margin: "0 10px", // Add 10px margin left and right
              padding: "5px", // Add padding to better control the space
              color: "white",
              fontSize: 100,
              fontFamily: "Inter",
              fontWeight: "900",
              wordWrap: "break-word",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {money}€
          </div>
          <div
            style={{
              bottom: 10,
              color: "#747474",
              fontSize: 25,
              fontFamily: "Inter",
              fontWeight: "500",
              wordWrap: "break-word",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            d’économiser
          </div>
        </div>
        <div id="date" className="text-right mt-3 mr-4">
          <b>
            <p
              style={{
                color: "#00B3E5",
                display: "inline-block",
                marginRight: "10px",
              }}
            >
              depuis le
            </p>
            <p style={{ display: "inline-block" }}>26/09/2011</p>
          </b>
        </div>
      </div>
      <div
        style={{
          width: 350,
          height: 0,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          border: "1px #434349 solid",
        }}
      />
      <div className="mt-12 ml">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter amount"
          className="size-lg text-black"
          style={{ width: 320 }}
        />
      </div>

      <Button onClick={handleAddMoney} className="mt-4">
        Ajouter au solde
      </Button>
      <div className="fixed bottom-6 right-6">
        <Button variant="destructive" onClick={resetMoney}>
          RaZ du solde
        </Button>
      </div>
    </div>
  );
};

export default Home;
