import React, { Component } from  'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
    } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from  '../actions/itemActions';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class ItemModal extends Component {
    state = {
        modal: false,
        name:''
    }
    toggle = () => {
        //console.log('clicked', this.state.modal)
        
        this.setState({modal: !this.state.modal})
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })

    }

    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            id: uuid(),
            name: this.state.name,
        }
        this.props.addItem(newItem);
        this.toggle();
    }
    render() {
        return (
            <div>
               <Button color="dark" style={{marginBottom:'2rem'}}
                onClick={this.toggle}
               > Add Item
               </Button>
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle} > Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name="name" id="item" placeholder="add an item." onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button color="dark" style={{marginBottom:'2rem'}} block> Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
               </Modal>
            </div>
        );
      }

    
}


ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);