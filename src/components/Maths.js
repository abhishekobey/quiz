import React, { useState } from 'react'
import MathQues from '../MathQues'

const Maths = () => {

    const TIME_LIMIT = 180;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    
    const onTimesUp = () => {
        clearInterval(timerInterval);
        setShowScore(true)
    }

    const startTimer = () => {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            if (document.getElementById("timer-label") === null)
            {
                return 0
            }
            else{document.getElementById("timer-label").innerHTML = 'Time left: ' + formatTime(timeLeft);}
            

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return `${minutes}:${seconds}`;
    }

    const [call, setCall] = useState(false)

    var [prevClick, setClick] = useState(0)

    const [submit, setShowsubmit] = useState(false);

    var [currentQues, setCurrentQues] = useState(0);

    const [showScore, setShowScore] = useState(false);

    const [showbtn, setShowbtn] = useState(false);
    
    const [changeGreenColor, setGreenColor] = useState(false)

    const [changeRedColor, setRedColor] = useState(false)
    
    const [score, setScore] = useState(0);

    const [ManageAns, setManageAns] = useState(false)

    const [Attempted, setAttempted] = useState(0)

    const handleAns = (isCorrect) => {

        setAttempted(Attempted + 1)

        if (isCorrect === true )
        {
            setGreenColor(true)
            // alert("Correct 👍")
            setScore(score + 1);
            setManageAns(true)
        }
        else {
            setRedColor(true)
            // alert("Incorrect 😣")
            setManageAns(true)
        }
    }

    const next = () => {
        if (prevClick === 0)
        {
            setManageAns(false)
            const nextQues = currentQues + 1;
            currentQues=nextQues
            setGreenColor(false)
            setRedColor(false)
            if (currentQues>0)
            {
                setShowbtn(true)
            }
            if (currentQues === MathQues.length-1)
            {
                setShowsubmit(true)
            }
            else { setShowsubmit(false) }

            if (nextQues<MathQues.length)
            {
                setCurrentQues(nextQues);
            }
            else { setShowScore(true) }
        }
        else{
            setManageAns(true)
            const nextQues = currentQues + 1;
            currentQues=nextQues
            setGreenColor(false)
            setRedColor(false)
            if (currentQues>0)
            {
                setShowbtn(true)
            }
            if (currentQues === MathQues.length-1)
            {
                setShowsubmit(true)
            }
            else { setShowsubmit(false) }

            if (nextQues<MathQues.length)
            {
                setCurrentQues(nextQues);
            }
            else { setShowScore(true) }
            setClick(prevClick - 1)
        }
    }
    
    const prev = () => {
        setClick(prevClick + 1)
        setManageAns(true)
        const prevQues = currentQues - 1;
        setGreenColor(false)
        setRedColor(false)
        if (prevQues>-1)
        {
            setCurrentQues(prevQues);
            currentQues=currentQues-1;
        }
        if (currentQues===MathQues.length-1)
        {
            setShowsubmit(true)
        }
        else { setShowsubmit(false) }
        if (currentQues>0)
        {
            setShowbtn(true)
        }
        else { setShowbtn(false) }
    }
    if (call === false)
    {
        startTimer()
        setCall(true)
    }

    const redColor = { color : 'red' }
    const greenColor = { color : 'green' }
    const orangeColor = { color : 'orange' }
    const yellowColor = { color : 'yellow' }
    const blueColor = { color : 'blue' }


    return (
        <div>
            {showScore ? (
                <div className='score'>
                    <br></br>
                    <h1 style={ orangeColor }>Number of Questions Attempted : {Attempted}</h1>
                    <h1 style={ yellowColor }>Number of Questions Missed : {MathQues.length - Attempted}</h1>
                    <h1 style={ redColor }>Number of Questions Wrong : {MathQues.length - (MathQues.length-Attempted) - score}</h1>
                    <h1 style={ greenColor }>Number of Questions Correct : {score}</h1>
                    <h1 style={ blueColor }>Your Total Score is {score} out of 10</h1>
                    <button onClick={()=> window.location.reload()}>PLAY AGAIN</button>
                </div>    
            ):(
                <>  
                    <div className="timer">
                        <h1>Maths quiz</h1>
                        <h2 id='timer-label'>Time left: ${formatTime(timeLeft)}</h2>
                    </div>
                    <h3>Q{`${MathQues[currentQues].no}`} : {`${MathQues[currentQues].ques}`} </h3><br/>
                    <div className='options' >
                        {ManageAns ? (
                            <div className='after_click'>
                                {changeGreenColor ? (
                                <div className='changeGreenColor'>
                                    {MathQues[currentQues].options.map((option) => (<button>{option.option}</button>))}
                                </div>
                                ): changeRedColor ? (
                                <div className='changeRedColor'>
                                    {MathQues[currentQues].options.map((option) => (<button>{option.option}</button>))}
                                </div>
                                ):(<div>{MathQues[currentQues].options.map((option) => (<button>{option.option}</button>))}</div>)}
                            </div>
                        ):(
                            <div className='nochange'>
                                {MathQues[currentQues].options.map((option) => (<button onClick= {()=> handleAns(option.isCorrect)}>{option.option}</button>))}
                            </div>
                        )}

                        
                        
                        <div className='actionbtns'>

                            {showbtn ? (
                                <button onClick={()=> prev()}>PREV</button>
                            ):(<></>)}

                            {submit ? (
                                <button onClick={()=> next()}>SUBMIT</button>
                            ):(<button onClick={()=> next()}>NEXT</button>)}

                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Maths

