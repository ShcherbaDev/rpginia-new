import { writeFileSync, existsSync, readFile } from 'fs';
import { ipcMain, dialog } from 'electron';
import { get, has, set } from 'electron-json-storage';
import config from './config';

export function createProject(window) {
    window.webContents.send('openModal', 'createProject');
    ipcMain.once('closeModal', (e, arg) => {
        let data = {};

        set('projectData', {
            path: arg.filePath.replace(/\\\\/g, '\\'),
            appPath: arg.appPath.replace(/\\\\/g, '\\'),
            type: arg.type
        });

        if(arg.type === 'level') {
            data.settings = {
                name: arg.name,
                background: '#000000'
            };

            data.elements = [];

            if(arg.spriteSheetPath !== '') {
                data.settings.spriteSheetPath = arg.spriteSheetPath;
            }

            writeFileSync(arg.filePath, JSON.stringify(data, null, 2));
        }

        window.setTitle(`${arg.name} - ${config.appName}`);

        console.log('Project has been created!\nArguments:', arg);

        e.sender.send('setUpProject', { 
            type: arg.type, 
            appPath: arg.appPath.replace(/\\\\/g, '\\'),
            data: data 
        });

        window.reload();
    });
}

export function openProject(window, startFromDialog = false) {
    if(startFromDialog) {
        const openProjectDialog = dialog.showOpenDialog(window, {
            title: 'Open project',
            filters: [
                {
                    name: '.JSON file',
                    extensions: ['json']
                }
            ]
        });

        if(openProjectDialog !== undefined) {
            const path = openProjectDialog[0];

            readFile(path, 'utf8', (error, data) => {
                if(error) throw error;
                
                let projType = '';
                let projData = JSON.parse(data);

                // Checking project type 
                if(projData.elements) projType = 'level'; // If project type is a level

                else {
                    dialog.showErrorBox('Project type error', 'The program can\'t define the type of project');
                    return false;
                }

                window.setTitle(`${projData.settings && projData.settings.name ? projData.settings.name : path} - ${config.appName}`);

                set('projectData', {
                    path: path,
                    type: projType
                });

                window.reload();

                window.webContents.send('setUpProject', { 
                    type: projType, 
                    data: projData 
                });
            });
        }

        else
            return false;
    }

    else {
        has('projectData', (err, hasKey) => {
            if(err) throw err;
            
            if(hasKey) {
                get('projectData', (error, data) => {
                    if(error) throw error;

                    if(existsSync(data.path)) {
                        readFile(data.path, 'utf8', (loadFileErr, fileData) => {
                            if(loadFileErr) throw loadFileErr;
                            fileData = JSON.parse(fileData);
                            console.log(`Project has been opened!\nProject name: ${fileData.settings.name}\nProject type: ${data.type}\nProject path: ${data.path}`);
                            window.setTitle(`${fileData.settings.name} - ${config.appName}`);
                            
                            readFile(data.appPath + fileData.settings.spriteSheetPath, 'utf8', (ee, aa) => {
                                if(ee) throw ee;
                                console.log(JSON.parse(aa));
                            })

                            window.webContents.send('setUpProject', { 
                                type: data.type,
                                appPath: data.appPath,
                                data: fileData 
                            });
                        });
                    }
                    else window.webContents.send('projectNotExist');
                });
            }

            else window.webContents.send('projectNotExist');
        });
    }
}

export function saveProject(window) {
    window.webContents.send('getProjectData');
    ipcMain.once('getProjectDataResponse', (e, obj) => {
        const store = obj.store;

        let projData = Object.assign({}, obj.projectData);

        get('projectData', (error, configData) => {
            if(error) throw error;

            if(configData.type === 'level') {
                for(let i in store.projectObjects) {
                    projData.elements[i] = store.projectObjects[i]._settings;

                    if(projData.elements[i].borderCoords) {
                        delete projData.elements[i].borderCoords;
                    }

                    if(projData.elements[i].centralPointCoords) {
                        delete projData.elements[i].centralPointCoords;
                    }
                }
            }
            writeFileSync(configData.path.replace(/\\/g, '\\\\'), JSON.stringify(projData, null, 4));
        });
    });
}