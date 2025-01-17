/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleRejection } from '../../utils/errorHandlers';

const ACCESS_TOKEN = localStorage.getItem('token_access_google')

const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
};

export const createEvent = createAsyncThunk(
    'calendar/createEvent',
    async ({ event_data}, { rejectWithValue }) => {  
      const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
      console.log(event_data);
      
  
      try {

        const response = await axios.post(url, event_data, { headers });  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

export const listEvents = createAsyncThunk(
    'calendar/listEvents',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'calendar/deleteEvent',
    async (EVENT_ID, { rejectWithValue }) => {
        const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${EVENT_ID}`;

        try {
            await axios.delete(url, { headers });
            return EVENT_ID;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const lireMessages = createAsyncThunk(
    'messages/lireMessages',
    async (queryParams, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/gmail/v1/users/me/messages';

        try {
            const response = await axios.get(url, { headers, params: queryParams });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const voirMessageDetail = createAsyncThunk(
    'messageDetail/voirMessageDetail',
    async (MESSAGE_ID, { rejectWithValue }) => {
        const url = `https://www.googleapis.com/gmail/v1/users/me/messages/${MESSAGE_ID}`;

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const driveService = createAsyncThunk(
    'calendar/driveService',
    async (EVENT_ID, { rejectWithValue }) => {
        const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${EVENT_ID}`;
        try {
            const response = await axios.patch(url, {}, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const listFiles = createAsyncThunk(
    'files/listFiles',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/drive/v3/files';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data.files;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const ObtenirFileLink = createAsyncThunk(
    'fileLink/FileLink',
    async (file_id, { rejectWithValue }) => {
        const url = `https://www.googleapis.com/drive/v3/files/${file_id}?fields=webViewLink`;

        try {
            const response = await axios.get(url, { headers });
            return response.data.webViewLink;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createFolder = createAsyncThunk(
    'folder/createFolder',
    async ({ rejectWithValue }) => {
        const url = 'https://www.googleapis.com/drive/v3/files';

        try {
            const response = await axios.post(url, {}, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async (file_id, { rejectWithValue }) => {
        const url = `https://www.googleapis.com/drive/v3/files/${file_id}`;

        try {
            await axios.delete(url, { headers });
            return file_id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const listPlaylists = createAsyncThunk(
    'playlists/Playlists',
    async () => {
        const url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true';

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            return 
        }
    }
);

// export const videoPlaylist = createAsyncThunk(
//     'playlistItems/PlaylistItems',
//     async ({params}, { rejectWithValue }) => {
//         const url = 'https://www.googleapis.com/youtube/v3/playlistItems';

//         try {
//             const response = await axios.get(url, { headers, params });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


export const videoPlaylist = createAsyncThunk(
    'playlistItems/PlaylistItems',
    async ({ playlistId, maxResults = 10 }, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const params = {
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            maxResults: maxResults,
        };

        try {
            const response = await axios.get(url, { headers, params });
            return response.data.items;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const infoCanal = createAsyncThunk(
    'info/infos',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/channels';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const abonnementsCanal = createAsyncThunk(
    'infoabon/abonnement',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/subscriptions';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const videoPopulaires = createAsyncThunk(
    'calandar/populaire',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/videos';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const tendances = createAsyncThunk(
    'calandar/tendance',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/videos';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const detailVideos = createAsyncThunk(
    'calandar/vidDetail',
    async (params, { rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/videos';

        try {
            const response = await axios.get(url, { headers, params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const listLikes = createAsyncThunk(
    'calandar/listLik',
    async ({ rejectWithValue }) => {
        const url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&myRating=like';

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const servicegoogleSlice = createSlice({

    name: 'servicegoogle',
    initialState: {
        event: null,
        events: [],
        messages: [],
        messageDetail: null,
        driveEvent: null,
        files: [],
        filesLink: null,
        folder: null,
        listsPlay: [],
        videoList: [],
        infosCanal: [],
        abonneCanal: [],
        vidPopulaires: [],
        tendanceinfo: [],
        videDetail: null,
        listVideoLiks: [],
        loading: null,
        error: null,
        status: 'idle'
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(createEvent.pending, (state) => {
             state.status==='pending'
            state.loading = true;
            state.error = null;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
             state.status==='created'
            state.loading = false;
            state.event = action.payload.data;
        })
        .addCase(createEvent.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(listEvents.pending, (state) => {
             state.status==='pending'
            state.loading = true;
            state.error = null;
        })
        .addCase(listEvents.fulfilled, (state, action) => {
            state.loading = false
            state.status==='sucess'
            state.events = action.payload.items;
        })
        .addCase(listEvents.rejected, (state, action) => {
            handleRejection(state, action);
            
          
        })
        .addCase(lireMessages.pending, (state) => {
            state.loading = false;
        })
        .addCase(lireMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages = action.payload.data;
        })
        .addCase(lireMessages.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(voirMessageDetail.pending, (state) => {
            state.loading = false;
        })
        .addCase(voirMessageDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.messageDetail = action.payload.data;
        })
        .addCase(voirMessageDetail.rejected, (state, action) => {
            handleRejection(state, action);
        })
        // .addCase(driveService.pending, (state) => {
        //     state.loading = false;
        // })
        // .addCase(driveService.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.driveEvent = action.payload.data;
        // })
        // .addCase(driveService.rejected, (state, action) => {
        //     handleRejection(state, action);
        // })
        .addCase(driveService.pending, (state) => {
            state.loading = false;
        })
        .addCase(driveService.fulfilled, (state, action) => {
            state.loading = false;
            state.files = action.payload.data;
        })
        .addCase(driveService.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(ObtenirFileLink.pending, (state) => {
            state.loading = false;
        })
        .addCase(ObtenirFileLink.fulfilled, (state, action) => {
            state.loading = false;
            state.filesLink = action.payload.data;
        })
        .addCase(ObtenirFileLink.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(createFolder.pending, (state) => {
            state.loading = false;
        })
        .addCase(createFolder.fulfilled, (state, action) => {
            state.loading = false;
            state.folder = action.payload.data;
        })
        .addCase(createFolder.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(listPlaylists.pending, (state) => {
            state.loading = false;
        })
        .addCase(listPlaylists.fulfilled, (state, action) => {
            state.loading = false;
            state.listsPlay = action.payload.items;
        })
        .addCase(listPlaylists.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(videoPlaylist.pending, (state) => {
            state.loading = false;
        })
        .addCase(videoPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action);
            
            state.videoList = action.payload;
        })
        .addCase(videoPlaylist.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(infoCanal.pending, (state) => {
            state.loading = false;
        })
        .addCase(infoCanal.fulfilled, (state, action) => {
            state.loading = false;
            state.infosCanal = action.payload.data;
        })
        .addCase(infoCanal.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(abonnementsCanal.pending, (state) => {
            state.loading = false;
        })
        .addCase(abonnementsCanal.fulfilled, (state, action) => {
            state.loading = false;
            state.abonneCanal = action.payload.data;
        })
        .addCase(abonnementsCanal.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(videoPopulaires.pending, (state) => {
            state.loading = false;
        })
        .addCase(videoPopulaires.fulfilled, (state, action) => {
            state.loading = false;
            state.vidPopulaires = action.payload.data;
        })
        .addCase(videoPopulaires.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(tendances.pending, (state) => {
            state.loading = false;
        })
        .addCase(tendances.fulfilled, (state, action) => {
            state.loading = false;
            state.tendanceinfo = action.payload.data;
        })
        .addCase(tendances.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(detailVideos.pending, (state) => {
            state.loading = false;
        })
        .addCase(detailVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videDetail = action.payload.data;
        })
        .addCase(detailVideos.rejected, (state, action) => {
            handleRejection(state, action);
        })
        .addCase(listLikes.pending, (state) => {
            state.loading = false;
        })
        .addCase(listLikes.fulfilled, (state, action) => {
            state.loading = false;
            state.listVideoLiks = action.payload.data;
        })
        .addCase(listLikes.rejected, (state, action) => {
            handleRejection(state, action);
        });
    }
});

export default servicegoogleSlice.reducer;
