"use client";
import React, { useEffect } from "react";
import "./snow.scss";
import imgLiXi from "../../../../public/sale-12/baolixi.png";
const Snowfall: React.FC = () => {
  // const flakeSvg = `<svg width="129.108px" height="140.597px" viewBox="0 0 129.108 140.597" enable-background="new 0 0 129.108 140.597" xml:space="preserve" version="1.1" class="flake"><path fill="#00FFFF" d="M106.491,83.706l17.706,10.222l-4.067,7.046l-17.88-10.324l4.693,17.494l-7.814,2.096l-6.121-22.916l-0.604-2.402L71,72.519v25.01l1.569,1.627l16.848,16.906l-5.688,5.727L71,108.984V129h-8v-20.221l-12.917,12.807l-5.837-5.727l16.849-16.775L63,97.325V72.519L41.371,84.922l-0.79,2.402l-6.14,22.916l-7.823-2.096l4.688-17.494l-17.882,10.324l-4.068-7.046l17.705-10.222L9.566,79.018l2.096-7.823l23.095,6.188l2.223,0.596l21.66-12.505L37.157,53.071l-2.402,0.644l-22.916,6.14l-2.096-7.823l17.495-4.688L9.358,37.019l4.07-7.046l17.71,10.222l-4.678-17.494l7.842-2.096L40.525,43.7l0.669,2.223L63,58.428V33.622l-1.868-1.758L44.247,15.088l5.8-5.727L63,22.168V2h8v19.963L83.748,9.156l5.668,5.727L72.549,31.79L71,33.418v25.01l21.581-12.505l0.517-2.223l6.188-23.095l7.823,2.096l-4.688,17.494l17.705-10.222l4.068,7.046l-17.882,10.324l17.494,4.688l-2.096,7.823l-22.916-6.14l-2.402-0.644L74.911,65.473L96.57,77.979l2.223-0.596l23.095-6.188l2.096,7.823L106.491,83.706z"/></svg>`;

  const redEnvelopeSvg = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="envelope">
    <path d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z" fill="#FF0000"/>
    <path d="M3 9L12 13L21 9" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const createSnowflake = () => {
    const flakeWrapper = document.createElement("div");
    flakeWrapper.className = "flake-wrapper";
    const flakeSize = Math.random() + 0.1;
    const flakePos = Math.random() * 90 + 4;
    const fallingTime = Math.floor(Math.random() * 10) + 5;

    flakeWrapper.style.width = "40px";
    flakeWrapper.style.height = "40px";
    flakeWrapper.style.left = `${flakePos}%`;
    flakeWrapper.style.transform = `scale(${flakeSize})`;
    flakeWrapper.style.animation = `falling-snow ${fallingTime}s linear infinite`;

    const imgElement = document.createElement("img");
    imgElement.src = imgLiXi.src;
    imgElement.className = "envelope";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";

    flakeWrapper.appendChild(imgElement);
    document.querySelector(".background")?.appendChild(flakeWrapper);
  };

  const removeSnowflakes = () => {
    document.querySelectorAll(".flake-wrapper").forEach((flake) => {
      if (
        flake instanceof HTMLElement &&
        flake.offsetTop > document.documentElement.clientHeight - 100
      ) {
        flake.remove();
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createSnowflake();
      removeSnowflakes();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div className="background"></div>;
};

export default Snowfall;
