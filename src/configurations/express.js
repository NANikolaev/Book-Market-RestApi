const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors')

module.exports=(server)=>{
    server.use(express.json());
    server.use(cookieParser());
    server.use(express.urlencoded({ extended: true }));
    server.use(cors({
        origin:'http://localhost:3000',
        methods:'*',
        credentials:true,
        allowedHeaders:"*",
    }))
}