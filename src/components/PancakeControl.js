// IMPORT EXTERNAL LIBRARIES/MODULES
import React, {Component} from 'react';
// IMPORT API & ROUTE ACTIONS
import '../styles/App.css';
import PancakeList from "./PancakeList";
import Toast from "./Toast";

export class PancakeControl extends Component {
    initialState = {}

    constructor(props) {
        super(props);
        this.state = {
            timeInterval: '',
            pancake_qty: '',
            isFormValid: true,
            sortingStarted: false,
            isSorted: false,
            levelToast: '',
            messageToast: '',
            showToast: false
        }
        this.initialState = this.state;
    }

    onSubmit = async e => {
        try {
            e.preventDefault();
            const {timeInterval, pancake_qty} = this.state

            if (timeInterval > 0 && pancake_qty >= 2 && pancake_qty <= 50) {
                this.setState({sortingStarted: true})
            } else {
                this.setState({isFormValid: false});
                console.log('validations not  matching')
                var message = '';
                if (timeInterval < 1) {
                    message += "Time Interval > 0 |"
                }
                if(pancake_qty < 2 || pancake_qty > 50) {
                    message += " Pancake numbers between [2,50]"
                }
                this.showToastFunction(message, 'danger');
            }
        } catch (error) {
            this.setState({
                isFormValid: false,
            })
            console.log('Error: ', error)
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value, isFormValid: true});
    }

    /*
    * @param {message}  message to show on Toast
    * @param {level}  level of message like success, warning or error
    * */
    showToastFunction = (message, level) => {
        this.setState({showToast: true, messageToast: message, levelToast: level}, () => {
            setTimeout(() => {
                this.setState({showToast: false})
            }, 1000)
        })

    }

    response = () => {
        this.setState({isSorted: true, sortingStarted: false});
        this.showToastFunction('Sorted', 'success');
    }

    resetStates = () => {
        this.setState(this.initialState);
    };

    render() {
        const {sortingStarted, timeInterval, pancake_qty, isFormValid, levelToast, messageToast, showToast} = this.state;

        let boxClass = ["form-inline", "custom-form"];
        if (!isFormValid) {
            boxClass.push('was-validated');
        }
        return (
            <div className="App">
                <div className="container">
                    <form onSubmit={this.onSubmit} className={boxClass.join(' ')} id="form">
                        <div className="form-group col-md-12">
                            <div className="input-group input-group-sm col-3">
                                <input type="number" className="form-control" disabled={sortingStarted}
                                       name="timeInterval" id="timeInterval" min={1}
                                       placeholder="Time*"
                                       required value={timeInterval} onChange={this.handleInputChange}/>
                                <div className="input-group-append">
                                    <span className="input-group-text">millisec.</span>
                                </div>
                            </div>
                            <Toast
                                level={levelToast}
                                message={messageToast}
                                visible={showToast}
                            />
                            <div className="input-group input-group-sm col-6">
                                <input type="number" className="form-control" disabled={sortingStarted}
                                       name="pancake_qty" id="pancake_qty" min={2} max={50}
                                       placeholder="How many pancakes [from 2 to 50]*"
                                       required value={pancake_qty} onChange={this.handleInputChange}/>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-danger btn-sm"
                                        disabled={sortingStarted}>Action
                                </button>
                                <button type="button" className="btn btn-danger btn-sm"
                                        onClick={this.resetStates}>Reset
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="padding-10-0">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="hide-overflow planet-list-outer">
                                    {sortingStarted && <PancakeList
                                        numOfPancakes={Number(pancake_qty)}
                                        response={this.response}
                                        timeInterval={Number(timeInterval)}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PancakeControl;