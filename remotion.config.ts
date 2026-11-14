import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setCodec('h264');
Config.setAudioCodec('aac');
Config.setAudioBitrate('320k');
Config.setConcurrency(4);

