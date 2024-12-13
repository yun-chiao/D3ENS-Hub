import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { getPrice } from '@ensdomains/ensjs/public'
import React, { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function PriceCard({ensName, shibObj, coreObj, countPrice}) {
  const [selectShib, setSelectShib] = useState(false);
  const [selectCore, setSelectCore] = useState(false);

  return (
        <Card className='w-full h-[170px] mb-8 mt-4'>
          <CardContent>
            <Typography variant="h6" component="div">
              {ensName}
            </Typography>
            <Divider  />
            <div className='grid grid-flow-row-dense grid-cols-5 gap-2 grid-rows-1 mt-4'>
              <div className="text-lg col-span-3">
                {shibObj.sld}.{shibObj.tld}
              </div>
              <div>
                <div className="text-sm">
                  {Math.trunc(shibObj.nativeAmount)} {shibObj.nativeCurrency}
                </div>            
                <div className="text-sm">
                  ${Math.trunc(shibObj.usdPrice)}/yr
                </div>             
              </div>
              {shibObj.status ==="reserved"? 
                <button className='bg-gray-300 px-2 mx-2 rounded cursor-not-allowed w-20' disabled>Reserved</button>:
                selectShib?
                <button className='bg-green-700 px-2 mx-2 rounded w-20' onClick={()=>{setSelectShib(!selectShib);countPrice(-shibObj.usdPrice)}}>Remove</button> :
                <button className='bg-green-300 px-2 mx-2 rounded w-20' onClick={()=>{setSelectShib(!selectShib);countPrice(shibObj.usdPrice)}}>Add</button>  
              }
            </div>
            <div className='grid grid-flow-row-dense grid-cols-5 gap-2 grid-rows-1 mt-4'>
              <div className="text-lg col-span-3">
              {coreObj.sld}.{coreObj.tld}
              </div>
              <div>
                <div className="text-sm">
                {Math.trunc(coreObj.nativeAmount)} {coreObj.nativeCurrency}
                </div>            
                <div className="text-sm">
                ${Math.trunc(coreObj.usdPrice)}/yr
                </div>             
              </div>
              {coreObj.status ==="reserved"? 
                <button className='bg-gray-300 px-2 mx-2 rounded cursor-not-allowed w-20' disabled>Reserved</button>:
                selectCore?
                <button className='bg-green-700 px-2 mx-2 rounded w-20' onClick={()=>{setSelectCore(!selectCore);countPrice(-coreObj.usdPrice)}}>Remove</button> :
                <button className='bg-green-300 px-2 mx-2 rounded w-20' onClick={()=>{setSelectCore(!selectCore);countPrice(coreObj.usdPrice)}}>Add</button>  
              }
            </div>
            <div>

            </div>
          </CardContent>
        </Card>
  );
}

export default PriceCard;
