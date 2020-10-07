import React, { Component } from 'react';

import Routes from "../Routes"

export default class Transaction extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { name, routes, context} = this.props
        console.log("Transaction routes",routes );
        return (
            // <Container>
            //     <Row>
            //         <Col sm>
            //             {/* <Breadcrumb>
            //                 <BreadcrumbItem>{name}</BreadcrumbItem>
            //             </Breadcrumb> */}
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col sm>
            //             <h2>{name}</h2>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col sm>
                        <Routes routes={routes} context={context}/>
            //         </Col>
            //     </Row>
            // </Container>
        );
    }
}