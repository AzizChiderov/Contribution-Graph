import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const Contribution = () => {
  const [data, setData] = useState([]);
  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dpg.gg/test/calendar.json");
      const responseData = response.data;

      if (typeof responseData === "object" && responseData !== null) {
        const formattedData = Object.entries(responseData).map(([date, count]) => ({
          date,
          contributions: count,
        }));
        setData(formattedData);
        setIsHovered(new Array(formattedData.length).fill(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContributions = () => {
    const colors = {
      0: "#EDEDED",
      2: "#ACD5F2",
      3: "#7FA8C9",
      4: "#527BA0",
      30: "#254E77",
    };

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const currentDate = new Date();
    const currentDateOffset = 51 * 7 - 1;

    return sortedData.map((day, index) => {
      const { date, contributions } = day;
      const cellDate = new Date(date);
      const daysDiff = Math.floor((currentDate - cellDate) / (1000 * 60 * 60 * 24));
      const columnIndex = Math.max(currentDateOffset - daysDiff, 0);
      const rowIndex = cellDate.getDay();

      const color = contributions >= 30
        ? colors[30]
        : contributions >= 20
        ? colors[4]
        : contributions >= 10
        ? colors[3]
        : contributions >= 1
        ? colors[2]
        : colors[0];

      const handleHover = (isHovered) => {
        setIsHovered(prevState => {
          const newState = [...prevState];
          newState[index] = isHovered;
          return newState;
        });
      };

      return (
        <span
          key={index}
          className={styles.container}
          title={`Дата: ${formatDate(date)}\nКоличество вкладов: ${contributions}`}
          style={{
            backgroundColor: color,
            gridColumn: columnIndex + 1,
            gridRow: rowIndex + 1,
          }}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          {contributions > 0 && <span></span>}
          {isHovered[index] && (
            <div className={styles.modalWindow}>
              <div className={styles.modalWrapper}>
                <p className={styles.color}>{contributions} contributions</p>
                <p className={styles.dates}>{formatDate(date)}</p>
              </div>
            </div>
          )}
        </span>
      );
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {weekday: "long", year: "numeric", month: "long", day: "numeric",};
    return date.toLocaleDateString("ru-RU", options);
  };

  return (
    <div className={styles.main}>
      {renderContributions()}
      <div className={styles.box}>
        <div>Меньше</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="84"
          height="20"
          viewBox="0 0 84 15"
          fill="none"
        >
          <path d="M15.9054 0H0.904877V15H15.9054V0Z" fill="#EDEDED" />
          <path d="M32.9059 0H17.9054V15H32.9059V0Z" fill="#ACD5F2" />
          <path d="M49.9064 0H34.906V15H49.9064V0Z" fill="#7FA8C9" />
          <path d="M66.907 0H51.9065V15H66.907V0Z" fill="#527BA0" />
          <path d="M83.9075 0H68.907V15H83.9075V0Z" fill="#254E77" />
        </svg>
        <div>Больше</div>
      </div>
    </div>
  );
};

export default Contribution;
