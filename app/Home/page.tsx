"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [money, setMoney] = useState(0);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    // Lorsque le composant est monté, récupérer le solde depuis localStorage s'il existe
    const savedMoney = localStorage.getItem("savedMoney");
    if (savedMoney) {
      setMoney(parseFloat(savedMoney));
    }
  }, []);

  const handleInputChange = (event: { target: { value: any } }) => {
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
      localStorage.setItem("savedMoney", newMoney.toString()); // Sauvegarder le nouveau solde dans LocalStorage
    }
    setInputValue("");
  };

  const resetMoney = () => {
    setMoney(0);
    localStorage.removeItem("savedMoney"); // Supprimer le solde sauvegardé dans LocalStorage
  };
  // Effectuer l'effet seulement une fois à l'initialisation

  return (
    <div className="flex flex-col items-center mt-12 ">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      ></link>
      <div id="Solde" className="mb-10">
        <div
          style={{
            width: 350,
            height: 183,
            position: "relative",
            background: "rgba(96.78, 96.78, 96.78, 0)",
          }}
          className="text-right"
        >
          <div
            style={{
              width: 350,
              height: 183,
              left: 0,
              top: 0,
              position: "absolute",
              background: "rgba(117.40, 117.40, 117.40, 0.50)",
              borderRadius: 25,
              border: "1px rgba(255, 255, 255, 0.10) solid",
              backdropFilter: "blur(25.80px)",
            }}
          />
          <div
            style={{
              left: 24,
              top: 9,
              position: "absolute",
              color: "white",
              fontSize: 100,
              fontFamily: "Inter",
              fontWeight: "900",
              wordWrap: "break-word",
            }}
          >
            <h1 className="text-right">{money}€</h1>
          </div>
          <div
            style={{
              left: 168,
              top: 130,
              position: "absolute",
              color: "#747474",
              fontSize: 25,
              fontFamily: "Inter",
              fontWeight: "500",
              wordWrap: "break-word",
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
      ></div>
      <div className="mt-12 ml">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter amount"
          className=" size-lg text-black"
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
