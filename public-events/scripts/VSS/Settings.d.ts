/// <reference path="References/VSS-Common.d.ts" />
import Service = require("VSS/Service");
/**
* Scope at which the local user setting applies
*/
export declare enum LocalSettingsScope {
    /**
    * Global (account-specific) settings for a user
    */
    Global = 0,
    /**
    * Project-specific settings for a user
    */
    Project = 1,
    /**
    * Team-specific settings for a user
    */
    Team = 2,
}
/**
* Service for reading and writing to local storage
*/
export declare class LocalSettingsService extends Service.VssService {
    private static GLOBAL_SETTING_KEY;
    private static PROJECT_SETTING_KEY;
    private static TEAM_SETTING_KEY;
    /**
     * Write a settings value to browser local storage
     *
     * @param key Key for the setting to be written. This key will be prefixed with a scope.
     * @param value Value for the setting to be written
     * @param scope Scope for the setting to apply to. This will determine the prefix to use at the beginning of the setting key.
     */
    write(key: string, value: any, scope?: LocalSettingsScope): void;
    /**
     * Read a setting from browser local storage.
     *
     * @param key Key for the setting to be written. This key will be prefixed with a scope.
     * @param defaultValue The value to return in case no setting exists
     * @param scope Scope for the setting to apply to. This will determine the prefix to use at the beginning of the setting key.
     * @return Value read from the setting or undefined if no value stored
     */
    read<T>(key: string, defaultValue?: T, scope?: LocalSettingsScope): T;
    private _getScopedKey(key, scope);
}
