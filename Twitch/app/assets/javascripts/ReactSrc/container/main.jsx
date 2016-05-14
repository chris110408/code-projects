/**
 * Created by leichen on 5/9/16.
 */
import React, { Component } from 'react';
import Twitch from './Twitch.jsx';
import {  combinedTask,Streams  } from './PureModel'
import R from 'ramda';
import classNames from 'classnames'





export default class Main extends Component {

    //init state :: {error:: String}
    constructor(props){
        super(props);
        this.state = {
            error: '',
            activeClass:'all',
            streams:[],
            currentStreams:[]
        };
        this.showError = this.showError.bind(this);
        this.termChanged = this.termChanged.bind(this);
        this. loadStream = this.loadStream.bind(this);
        this.updateResults = this.updateResults.bind(this);
        this.changeActiveStatus = this.changeActiveStatus.bind(this);

    }

    componentWillMount(){
        this. loadStream();
    }
    //showError :: String -> State Error
    showError(s){
        this.setState({ error: s });
    }

    //termChanged :: Event -> State Term
    termChanged({ currentTarget: t }){
        this.setState({ term: t.value });
    }

    //updateResults :: [obj] -> State streams
    updateResults(xs){
        xs.map((elt)=> elt)
        this.setState({ streams: xs ,currentStreams:xs});
        console.log(this.state.streams)
    }

    //searchClicked :: Event ->State streams
    loadStream(_){
           console.log('startLoading')
           combinedTask.fork(this.showError,this.updateResults);
    }
    //::string->(obj->bool)->State activeClass currentStreams
    changeActiveStatus(status,fn){
        if(this.state.streams.length!=0) {
            this.setState({activeClass: status})
            let streams = this.state.streams;
            let filteredStream = streams.filter(fn)
            this.setState({currentStreams: filteredStream})
        }
    }

    render(){

        const activeStatus = this.state.activeClass

        const allClassName = classNames('selector',{active:activeStatus =='all'})
        const offlineClassName = classNames('selector',{active:activeStatus =='offline'})
        const onlineClassName = classNames('selector',{active:activeStatus =='online'})

        return (
                <div className="container">
                    <div className="row" id="header">
                        <h1>Twitch Streamers</h1>
                        <div className="menu">
                            <div className={allClassName} onClick={this.changeActiveStatus.bind(null,'all',((_)=>true))}>
                                <div className="circle"></div><p>All</p>
                            </div>
                            <div className={onlineClassName} onClick={this.changeActiveStatus.bind(null,'online',((obj)=>obj.status=='online'))} >
                                <div className="circle" ></div><p>Online</p>
                            </div>
                            <div className={offlineClassName} onClick={this.changeActiveStatus.bind(null,'offline',((obj)=>obj.status!='online'))}>
                                <div className="circle" ></div><p>Offline</p>
                            </div>

                        </div>
                    </div>
                    <div id="display">
                    </div>
                    <div className="row" id="footer">
                    </div>

                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <Twitch id="display"
                        data = {this.state.currentStreams}
                        showError={this.showError}
                        termChanged={this.termChanged}
                        activeStatus={activeStatus}
                    />


                </div>


        );
    }
}

