import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';


const tokenDecoder = (token) => {
    let tok=null
    try {
        tok = jwtDecode(token)
    } catch (error) {
        return null
    }
    return tok
}

export default tokenDecoder