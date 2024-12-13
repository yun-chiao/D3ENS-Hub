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
import ShibIcon from './svgs/shib';

function PriceCard() {
    const [address, setAddress] = useState('0x5Ee4a6eeD1d42605526Fc3f75f0F791e465AB47B');
    const [ensNames, setEnsNames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchEnsNames = async () => {
      setLoading(true);
      setError(null);
      setEnsNames([]);
  
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await axios.get(`https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts`, {
          headers: {
            'Accept': 'application/json',
            'X-API-KEY': apiKey,
          },
        });
        console.log("response", response)
        const assets = response.data.nfts;
        const ensDomains = assets
          .filter(asset => asset.name && asset.name.endsWith('.eth'))
          .map(asset => asset.name);
        console.log("ensDomains", ensDomains)
        setEnsNames(ensDomains);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch ENS names. Please check the address and try again.');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchD3TokenDetail = async(chain, name) => {
        console.log("chain", chain)
        try {
            const apiKey = process.env.REACT_APP_D3_API_KEY;
            const response = await axios.get(`https://api-public.d3.app/v1/partner/search?limit=25&skip=0&tld=${chain}&sld=${name}`, {
              headers: {
                'Accept': 'application/json',
                'Api-Key': apiKey,
              },
            });
            console.log("response", response)
            // const assets = response.data.nfts;
            // const ensDomains = assets
            //   .filter(asset => asset.name && asset.name.endsWith('.eth'))
            //   .map(asset => asset.name);
            // console.log("ensDomains", ensDomains)
          } catch (err) {
            console.error(err);
            setError('Failed to fetch ENS names. Please check the address and try again.');
          } finally {
            setLoading(false);
          }
    }
    // From here
    const searchENS = () => {

    }

  return (
        <Card className='w-full h-[170px] mb-8 mt-4'>
          <CardContent>
            <Typography variant="h6" component="div">
              eth.eth
            </Typography>
            <Divider  />
            <div className='grid grid-flow-row-dense grid-cols-5 gap-2 grid-rows-1 mt-4'>
              <div className="text-lg col-span-3">
                eth.core
              </div>
              <div>
                <div className="text-sm">
                  7.1234 CORE
                </div>            
                <div className="text-sm">
                  $10/yr
                </div>             
              </div>
              <button className='bg-green-300 px-2 mx-2 rounded'>Cart</button> 
            </div>
            <div className='grid grid-flow-row-dense grid-cols-5 gap-2 grid-rows-1 mt-4'>
              <div className="text-lg col-span-3">
                easadasdasth.core
              </div>
              <div>
                <div className="text-sm">
                  7.1234 CORE
                </div>            
                <div className="text-sm">
                  $10/yr
                </div>             
              </div>
              <button className='bg-green-300 px-2 mx-2 rounded'>Cart</button> 
            </div>
            <div>

            </div>
          </CardContent>
        </Card>
  );
}

export default PriceCard;
