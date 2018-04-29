import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

Modal.setAppElement('#root')

class IndecisonApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDecide = this.handleDecide.bind(this);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleRemoveOne = this.handleRemoveOne.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.state = {
            options: props.options,
            selectedOption: undefined
        }
    }



    componentDidMount() {
        try {
            const optionsString = localStorage.getItem('options');
            const options = JSON.parse(optionsString)
            if (options) {
                this.setState(() => ({
                    options
                }))
            }
        } catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const options = JSON.stringify(this.state.options);
            localStorage.setItem('options', options);
        }
    }

    handleAddOption(option) {
        if (!option) {

            return 'Enter a valid Text';

        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exist";
        }

        this.setState((prevState) => {
            return {
                options: [...prevState.options, option]

            }
        })
    }

    handleRemoveAll() {
        this.setState(() => ({
            options: []
        }))
    }

    handleRemoveOne(optionToRemove) {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => optionToRemove !== option)
            }
        })

    }

    clearSelection() {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }

    handleDecide() {
        const decisionIndex = Math.floor(Math.random() * this.state.options.length);
        const decision = this.state.options[decisionIndex];
        this.setState(() => ({
            selectedOption: decision
        }));
    }



    render() {

        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        return ( <div>
            <Header 
                title = {title} 
                subtitle = {subtitle}/> 
            
            <div className="container">
                <Action 
                    canDecide = {this.state.options.length > 0}
                    decide = {this.handleDecide}
                    /> 
                
                <div className="widget">
                <Options 
                    canDecide = {this.state.options.length > 0}
                    removeAll = {this.handleRemoveAll}

                    options = {this.state.options}
                    remove = { this.handleRemoveOne}/>

                <AddOption 
                    handleAddOption = {this.handleAddOption }/> 
                </div>
                
            </div>
            
            <OptionModal 
                selectedOption = { this.state.selectedOption}
                clearSelection = {this.clearSelection}/>

            </div>
        )
    }


}

const Header = (props) => {
    return ( <div className="header">

            <div className="container">

                 <h1 className="header__title"> 
                     {props.title} 
                </h1> 
                 <h2 className="header__subtitle">  
                     {props.subtitle } 
                </h2> 
            </div>
           
        </div>
    )
}

class AddOption extends React.Component {
        constructor(props) {
            super(props);
            this.handleSubmitButton = this.handleSubmitButton.bind(this);
            this.state = {
                error: undefined

            }
        }



        handleSubmitButton(e) {
            e.preventDefault();


            const option = e.target.elements.option.value.trim();

            e.target.elements.option.value = '';

            const error = this.props.handleAddOption(option);

            this.setState(() => {
                return {
                    error
                };

            });
        }



        render() {
            return (

                <div> 
                    {this.state.error && <p className="add-option-error">  {this.state.error} </p>} 
                    <form className="add-option"
                        onSubmit = {this.handleSubmitButton} >

                        <input className="add-option__input" type = 'text'name = 'option'/>
                        <button className="button" type = 'submit'> Add Option </button>
                     </form> 
                    
                    </div>



                )
            }


        }

        class Action extends React.Component {
            render() {
                return ( <div >
                        <button className="big-button"
                            disabled = {!this.props.canDecide}
                            onClick = {this.props.decide}> What should I Do ? </button> 
                        <br/>
                       
                    </div>
                )
            }
        }

        class Options extends React.Component {

                render() {
                    return ( 
                        <div> 
                        
                            <div className="widget-header">
                                <h3 className="widget-header__title">Your Options</h3>

                                <button className="button button--link"
                                    disabled = {!this.props.canDecide}
                                    onClick = {this.props.removeAll}> Remove All </button> 
                                
                            
                            </div>
                            
                            
                            
                            
                            {this.props.options.length === 0 && <p className="widget__message"> Please type in an option to get started </p>}

                                {
                                    this.props.options.map((option, index) => {
                                        return (
                                            <div className="option" key = {option}> 
                                                <p className="option__text">{index+1}. {option} </p>
                                                
                                                <button className="button button--link"
                                                    onClick = {() => this.props.remove(option)}> Remove 
                                                </button>

                                            </div>
                                        )
                                    })
                                } 
                            
                            </div>


                        )
                    }
                }

                class OptionModal extends React.Component {
                        render() {
                            return ( 
                                <Modal isOpen = {!!this.props.selectedOption}
                                    contentLabel = "Example Modal"
                                     closeTimeoutMS={200}
                                     className="modal"
                                    onRequestClose = {this.props.clearSelection}>

                                <h3 className="modal__title"> Selected Option </h3> {
                                    this.props.selectedOption && <p className="modal__body"> {this.props.selectedOption} </p>} 
                                    <button className="button" onClick = {this.props.clearSelection}>Okay</button> </Modal>
                                )
                            }
                        }

                        IndecisonApp.defaultProps = {
                            options: []
                        }





ReactDOM.render( <IndecisonApp/> , document.getElementById('root'));