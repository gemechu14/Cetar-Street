const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const createError=require("../utils/errorResponse.js")

const app = express();
app.use(bodyParser.json());
const { URLSearchParams } = require('url');

const tenantId = '80dd5331-c6a7-48ef-9341-097b33c8f6cc'; // Replace with your Tenant ID
const clientId = 'b505a8a8-5160-4c22-96fc-ff5ec5458a05'; // Replace with your Client ID
const clientSecret = 'SWO8Q~0zRf8hp-UwPub0IByO2nyzm9MedxtMCbVv'; // Replace with your Client Secret
//80dd5331-c6a7-48ef-9341-097b33c8f6cc

//0e127f52-fdfc-409b-8ae3-6fa4fa9b4f46

//0c2bb19d-b943-4688-b309-a2828bd6b437



const getToken = async (res) => {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://analysis.windows.net/powerbi/api/.default');

    try {
        const response = await axios.post(tokenUrl, params);
        return response.data.access_token;
    } catch (error) {
        // return res.status().json(error)
        console.error('Error getting token:', error);
    }
};
exports.getAccessToken = async (req, res, next) => {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://analysis.windows.net/powerbi/api/.default');

    try {
        const response = await axios.post(tokenUrl, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        // Enhanced error logging for debugging
        console.error('Error getting token:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            message: error.message,
            details: error.response ? error.response.data : null
        });
    }
};

exports.getWorkspaces= async(req,res,next)=>{
    try {

        

        const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('scope', 'https://analysis.windows.net/powerbi/api/.default');
    
       
            const response = await axios.post(tokenUrl, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            });
            const token = response?.data?.access_token;
            // return res.status(200).json(token);
       

        // return res.status(200).json({token:token})
        // Return the token first
        const url = 'https://api.powerbi.com/v1.0/myorg/groups';
        const response1 = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
             
            }
        });
        return res.status(200).json(response1.data);
    } catch (error) {
     
        return next(createError.createError(500,error))
        
    }
}

// const getWorkspaces = async (token) => {
//     const url = 'https://api.powerbi.com/v1.0/myorg/groups';


//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data.value;
//     } catch (error) {
//         console.error('Error getting workspaces:', error);
//     }
// };

const getDatasets = async (token, groupId) => {
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/datasets`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.value;
    } catch (error) {
        console.error('Error getting datasets:', error);
    }
};

const getReports = async (token, groupId) => {
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.value;
    } catch (error) {
        console.error('Error getting reports:', error);
    }
};

const getDashboards = async (token, groupId) => {
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dashboards`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.value;
    } catch (error) {
        console.error('Error getting dashboards:', error);
    }
};

app.get('/workspaces', async (req, res) => {
    const token = await getToken();
    const workspaces = await getWorkspaces(token);
    res.json(workspaces);
});

app.get('/workspaces/:workspaceId/datasets', async (req, res) => {
    const { workspaceId } = req.params;
    const token = await getToken();
    const datasets = await getDatasets(token, workspaceId);
    res.json(datasets);
});

app.get('/workspaces/:workspaceId/reports', async (req, res) => {
    const { workspaceId } = req.params;
    const token = await getToken();
    const reports = await getReports(token, workspaceId);
    res.json(reports);
});

app.get('/workspaces/:workspaceId/dashboards', async (req, res) => {
    const { workspaceId } = req.params;
    const token = await getToken();
    const dashboards = await getDashboards(token, workspaceId);
    res.json(dashboards);
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
