'use client'
import CustomBarChart from "@/components/ui/barChart.jsx";
import CircleGraph from "@/components/ui/circle";
import ProgBar from "@/components/ui/progress";
import MultiBarChart from "@/components/ui/triplebar";
import {dataset} from "./constant/dataset.js"
import AreaC from "@/components/ui/area";
import { useEffect, useState } from "react";
import { GoArrowSwitch } from "react-icons/go"
import Spline from "@splinetool/react-spline";
import ScatterPlotToo from "@/components/ui/scattertoo.jsx";
export default function Home() {
  const text= '"CHESS IS FOR TRAMPS"';
  const auth ="GM PAUL MORPHY";
  const tit = "moves distribution"
  const titleForCircle="Time control "
  const titleForArea=" Average elo distribution"
  const titleForTriple="results by opening (top 5)"
  const totalRows= 20058;
  const black='black'
  
  const [Data, setData] = useState([
    { label: 'rapid', color: 'lightCoral', value: 1 },
    { label: 'blitz', color: 'green', value: 1 },
    { label: 'bullet', color: 'blue', value: 1 },
  ]);
  const test = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
  ]
  const [moves, setMoves] = useState( [
    { label: '<20', value: 0 },
    { label: '21-40', value: 0 },
    { label: '41-60', value: 0 },
    { label: '61-80', value: 0 },
    { label: '81-100', value: 0 },
    { label: '>100', value: 0 },
  ]);
  const [elo,setElo] = useState (
  [
      { range: "800-1200", value: 0 },
      { range: "1200-1500", value: 0 },
      { range: "1500-1800", value: 0 },
      { range: "1800-2100", value: 0 },
      { range: "2100+", value: 0 },
    ] );
    const [opening,setOpening] = useState([]);
    const [openingToo,setOpeningToo]= useState([]);
    const [whiteWinRate, setWhiteWinRate]= useState();
    const [blackWinRate, setBlackWinRate]=useState();
    const [isFlipped, setIsFlipped] = useState(true);
    const [rotation, setRotation] = useState(360);
    const [draw,setDraw]=useState();
    const [visible,setVisible]=useState(false);
    const [scatterData, setScatterData] = useState({
      datasets: [
        {
          label: 'Scatter Dataset',
          data: [],
          backgroundColor: 'rgb(255, 99, 132)',
        },
      ],
    });
    const [whiteVicsta,setWhiteVicSta]= useState([
      {draw: 0, mate:0, resign:0, time:0, }  ]);
      const [blackVicsta,setBlackVicSta]= useState([
        {draw: 0, mate:0, resign:0, time:0, }  ]);
useEffect(()=>{
   const timeIncrements = dataset.map(game => game.time_increment.split('+')[0].trim())
  const nbrMoves = dataset.map(game => game.turns)
  const playerElo= dataset.map(game=> ({
    bR:game.black_rating,
    wR:game.white_rating}))
    const victoryStat= dataset.map(game=>({
      victoryStatus:game.victory_status,
      winner:game.winner
    }))

    let whiteVicStatus=victoryStat.filter(game=>game.winner==='White');
    whiteVicStatus=whiteVicStatus.map(game=>game.victoryStatus);
    const calculDraw=victoryStat.filter(game=>game.winner==='Draw');
    setDraw(calculDraw.length);
    let blackVicStatus=victoryStat.filter(game=>game.winner==='Black');
    blackVicStatus=blackVicStatus.map(game=>game.victoryStatus);
    const whoWin= dataset.map(game=>game.winner)
    const whiteWin= whoWin.filter(game=>game==='White');
    setWhiteWinRate(whiteWin.length);
    const blackWin= whoWin.filter(game=>game==='Black');
    setBlackWinRate(blackWin.length);
    const comOpenings= dataset.map(game=>({
      opShort:game.opening_shortname,
      opWinner: game.winner
    }))
   // Bin and aggregate scatter data
  const binSize = 100; // Bin size for rating differences
  const turnBinSize = 20; // Bin size for number of turns
  const ratingBins = Math.ceil(2200 / binSize);
  const turnBins = Math.ceil(200 / turnBinSize);

  const scatterBins = Array.from({ length: ratingBins }, () =>
    Array.from({ length: turnBins }, () => 0)
  );

  dataset.forEach((game) => {
    const ratingDiff = Math.abs(game.black_rating - game.white_rating);
    const turns = game.turns;

    const ratingIndex = Math.min(Math.floor(ratingDiff / binSize), ratingBins - 1);
    const turnIndex = Math.min(Math.floor(turns / turnBinSize), turnBins - 1);

    scatterBins[ratingIndex][turnIndex]++;
  });

  // Flatten and map binned data for scatter plot
  const dataForScatter = [];
  scatterBins.forEach((row, i) => {
    row.forEach((count, j) => {
      if (count > 0) {
        dataForScatter.push({
          x: i * binSize,
          y: j * turnBinSize,
          size: count, // Add size to represent density
        });
      }
    });
  });

  setScatterData({
    datasets: [
      {
        label: 'Scatter Dataset',
        data: dataForScatter,
        backgroundColor: 'rgb(255, 99, 132)',
        pointRadius: (context) => {
          const dataPoint = context.raw;
          return Math.sqrt(dataPoint.size); // Scale point size based on density
        },
      },
    ],
  });

    setOpeningToo(comOpenings);
    let acc = findCount(comOpenings);
  
    setOpening(acc);
    
 categorizeTime(timeIncrements)
  categorizeMoves(nbrMoves);
  categorizeElo(playerElo);
  categorizeVic(whiteVicStatus,setWhiteVicSta);
  categorizeVic(blackVicStatus,setBlackVicSta);  
  const timer = setTimeout(() => {
    setVisible(true);
  }, 1500);
  return () => clearTimeout(timer);
},[]);

const categorizeTime=(array)=>{
  let bullet = 0, blitz = 0, rapid = 0;
  array.forEach(element => {
    parseInt(element, 10);
    if (element<3){
      bullet=bullet+1;}
      else if(element>=10){
        rapid=rapid+1;}
           else {
            blitz=blitz+1;
           }
  })
   setData(prevData => prevData.map(item => {
    switch (item.label) {
      case 'rapid':
        return { ...item, value: rapid };
      case 'blitz':
        return { ...item, value: blitz };
      case 'bullet':
        return { ...item, value: bullet };
      default:
        return item;
    }
  }));
  ;
}
const categorizeMoves=(array)=>{
  let range1 = 0, range2 = 0, range3 = 0, range4 = 0, range5 = 0, range6 = 0;
  array.forEach(element => {
    if (element<=20){
      range1++;}
        if ((element<=40)&&(element>20)){
          range2++;}
          if ((element<=60)&&(element>40)){
            range3++;}
            if ((element<=80)&&(element>60)){
              range4++;}  
              if ((element<=100)&&(element>80)){
               range5++;}
              if (element>100){
                range6++;}  
  })
   setMoves(prevMoves => prevMoves.map(item => {
    switch (item.label) {
      case '<20':
        return { ...item, value: range1 };
      case '21-40':
        return { ...item, value: range2};
      case '41-60':
        return { ...item, value: range3 };
        case '61-80':
        return { ...item, value: range4 };
        case '81-100':
        return { ...item, value: range5 };
        case '>100':
        return { ...item, value: range6 };
      default:
        return item;
    }
  }));
  ;
}
const categorizeElo=(array)=>{
  let range1 = 0, range2 = 0, range3 = 0, range4 = 0, range5 = 0, avg=0;
  array.forEach(element => {
   avg= (element.bR+element.wR)/2;
        if ((avg<=1200)&&(avg>800)){
          range1++;

        }
          if ((avg<=1500)&&(avg>1200)){
            range2++;

          }
            if ((avg<=1800)&&(avg>1500)){
              range3++;

            }  
              if ((avg<=2100)&&(avg>1800)){
               range4++;

              }
              if (avg>2100){
                range5++;

              }  
  }

)

   setElo(prevElo => prevElo.map(item => {

    switch (item.range) {
      case "800-1200":
        return { ...item, value: range1};
      case "1200-1500":
        return { ...item, value: range2 };
        case "1500-1800":
        return { ...item, value: range3 };
        case "1800-2100":
        return { ...item, value: range4 };
        case "2100+":
        return { ...item, value: range5 };
      default:
        return item;
    }
  }));
  ;
}
const findCount = (array) => {
  let used = []; // Array to store unique counts
  array.forEach((element) => {
    // Check if 'element.opShort' already exists in the 'used' array
    const existing = used.find((item) => item.name === element.opShort);
    if (existing) {
      // Increment count if found
      existing.count++;
    } else {
      // Add a new object to 'used' if not found
      used.push({ name: element.opShort, count: 1 });
    }
  });

  return used; // Return the array of counts
};



const categorizeVic=(array,setState)=>{
  let Draw = 0, Resign = 0, Mate = 0, other=0;
  array.forEach(element => {
    if (element.toLowerCase()=='draw'){
      Draw++;}
      else if(element.toLowerCase()=='resign'){
        Resign++;}
        else if(element.toLowerCase()=='mate'){
         Mate++
        }
           else {
            other++
           }
  })
   setState([{
    draw:Draw, resign:Resign, mate:Mate, time:other
   }]);
  ;
}
  const handleFlip = () => {
    setRotation((prevRotation) => prevRotation + 180);
    setTimeout(() => {
        setIsFlipped(prevState => !prevState);
    }, 500);
  };

  return (
    <>
    <div
        className="max-h-[99svh] snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
        <section className="min-h-[99svh] w-[99svw] snap-start flex flex-col items-top pt-[70px]">
        <div className="fles flex-col">
        <div className="text-[100px] flex w-auto relative left-[15%]">
        <p className=" pr-4 text-[]">
          ONLINE 
        </p>
        <p className=" text-[rgb(199,113,113)]">
          CHESSGAMES
        </p></div>
<span className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-20"
style={{opacity: visible ? 0.5 : 0}}
>
 <Spline
        scene="https://prod.spline.design/lFqFDF0nMb4pvJ98/scene.splinecode"
      />
 </span>
 <div className="z-99 absolute bg-[#0a0e27] left-[64%] top-[60%] h-32 w-40"></div>
        <p className="appear text-[25px] left-[38%] relative z-99">Analysis of over 20k chess games</p></div>
        
      <div className="fnt relative top-[35svh] w-[80svw] ">
        <div className="block relative left-[30%] text-[45px]">
      {text.split("").map((char, index) => (
        <span className="letter-animation" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}</div>
      <div className="block relative left-[70%] text-[30px]">
      {auth.split("").map((char, index) => (
        <span className="letter-animation text-[rgb(199,113,113)]  " key={index} style={{ animationDelay: `${index * 0.2}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>))}</div>
      
      </div>

  
      </section>
      <section className="min-h-[99svh] w-[99svw] snap-start pt-4 z-100 ">
        <div className=" z-100 rounded-lg grid gap-4 shadow-2xl p-4 m-4 h-fill min-h-[calc(100vh-4rem)] w-fill">
       <p className="uppercase text-[50px] font-bold text-center  relative ">Time control and players rating</p>
       <div className="flex flex-row flex-nowrap p-4 relative w-fit gap-40 left-[15svw] ">
       <CircleGraph data={Data} title={titleForCircle}/>
         <AreaC data={elo} title={titleForArea}/>
       </div>
        </div>
      </section>
      
      <section className="min-h-[99svh] w-[99svw] snap-start pt-4 z-100 ">
      <div className=" rounded-lg grid gap-4 shadow-2xl p-2 m-2 h-fill min-h-[calc(100vh-3rem)] w-fill">
      <p className="uppercase text-[50px] font-bold text-center  relative ">Games length and win rates</p>
      <div className="flex flex-nowrap items-center p-8 gap-40">
          <CustomBarChart data={moves} title={tit}/>
          <div className="flex gap-4 ">
            <div
          style={{ transform:`rotateY(${rotation}deg)`,
                   transition: 'transform 1.5s ease'  }}
          >
          {isFlipped &&  <div>
          <ProgBar winRate={whiteWinRate} vicSta={whiteVicsta} draw={draw} color={'white'}/></div>
          }
          {!isFlipped &&
          <div className="scale-x-[-1]">
          <ProgBar winRate={blackWinRate} vicSta={blackVicsta} draw={draw} color={'black'}/></div>}</div>
          <button onClick={handleFlip} className=" p-2 bg-gray-700 h-fit w-fit text-white rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300 "><GoArrowSwitch /></button>
          </div>
        </div>
      </div>
      </section>
      <section className="min-h-[99svh] w-[99svw] snap-start pt-4 z-100 ">
      <div className="  rounded-lg grid gap-4 shadow-2xl p-2 m-2 h-fill min-h-[calc(100vh-3rem)] w-fill">
      <p className="uppercase text-[50px] font-bold text-center  relative ">opening choice impact</p>
      <div className="grid grid-cols-2 w-fit px-2 gap-[65svw] pb-[20px]">
        <MultiBarChart data={opening} title={titleForTriple} openings={openingToo} />
        </div>
      </div>
     </section>
     <section className="min-h-[99svh] w-[99svw] snap-start pt-4 z-100">
     <div className="  rounded-lg grid gap-4 shadow-2xl p-2 m-2 h-fill min-h-[calc(100vh-3rem)] w-fill">
      <p className="uppercase text-[50px] font-bold text-center  relative ">Game Length by Rating Gap</p>
      <div className="w-[80svw] pb-4 relative mx-auto p-4 rounded-lg shadow-lg duration-300 hover:scale-[102%] z-10 transition-transform border border-transparent bg-gray-700/50">
      <ScatterPlotToo data={scatterData.datasets[0].data} name="Sample 2D Data" />
        </div></div>
     </section>
   </div>
    </>
  );
}
