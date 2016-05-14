/**
 * Created by leichen on 5/9/16.
 */
import React, { Component } from 'react';
import R from 'ramda';
import classnames from 'classnames'
export default class Twitch extends Component {

    //init state :: {term:: String}
    constructor(props) {
        super(props);
    }


    render() {
        const results  = this.props.results;
        const streams=this.props.data

        const activeStatus = this.props.activeStatus;

        const streamsElt = (streams)=>{

            if (streams.length ==0){
                return <div>Loading</div>
            }
            return streams.map((el,i)=>{

                let classname = classnames("row", {online:el.status=="online"})

                const desc = ()=>{
                    if (el.status=="online" && el.desc){
                        return el.desc
                    }
                    return ''
                }
                const game = ()=>{
                    if (el.game){
                        return el.game
                    }
                    return el.display_name
                }
                return <div key={i} className="streamblock">
                            <div className={classname}>
                                 <div className="col-xs-2 col-sm-1" >
                                     <img src={el.logo} className="logo"/>
                                 </div>
                                 <div className="col-xs-10 col-sm-3" id="name">
                                     <a href={el.url} target="_blank">{el.display_name}</a>
                                 </div>
                                 <div className="col-xs-10 col-sm-8" id="streaming">
                                    <span>{game()} </span> {desc()}
                                 </div>
                            </div>
                        </div>

        })

        }
        return (
            <div id="Twitch">
                {streamsElt(streams)}
            </div>
        );
    }
}

//const imgs = results.map(src=><img src={src} key={src}/>)
//<div id="results">{imgs}</div>