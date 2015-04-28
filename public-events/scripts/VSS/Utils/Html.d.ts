/// <reference path="../References/VSS-Common.d.ts" />
export declare module HtmlNormalizer {
    /**
     * Normalizes the given html by removing the attributes like script and fixing incomplete tags
     *
     * @param html Html to normalize
     * @return
     */
    function normalize(html: string): string;
    /**
     * Sanitizes the given html by fixing incomplete tags and encoding unsafe text
     *
     * @param html Html to sanitize
     * @return
     */
    function sanitize(html: string): string;
}
export declare class TemplateEngine {
    /**
     * Replaces simple tokens, such as ${Foo}, in the input HTML template.
     *
     * @param template The HTML markup or text to use as a a template.
     * @param data The data to render.
     * @return The HTML string with template replacements.
     */
    private static _replaceSimpleTemplateTokens(template, data);
    /**
     * Replaces simple tokens which will not be HTML encoded, such as {{html Foo}}, in the input HTML template.
     *
     * @param template The HTML markup or text to use as a a template.
     * @param data The data to render.
     * @return The HTML string with template replacements.
     */
    private static _replaceUnencodedTemplateTokens(template, data);
    /**
     * Replaces foreach style tokens, such as {{each Foo}}, in the input HTML template.
     *
     * @param template The HTML markup or text to use as a a template.
     * @param data The data to render.
     * @return The HTML string with template replacements.
     */
    private static _replaceForEachTemplateTokens(template, data);
    /**
     * Replaces a Regex match within some text with a replacement.
     *
     * @param text The original text.
     * @param match A regex match within that text.
     * @param replacement The replacement string.
     * @return The updated string.
     */
    private static _replaceMatch(text, match, replacement);
    private static _getEncodedTextPropertyValue(data, propertyPath);
    private static _getTextPropertyValue(data, propertyPath);
    /**
     * Obtains a value from a given data object using a string property path.
     *
     * @param data An object.
     * @param propertyPath A dot separrated property path. Undefined or empty string returns the plain data object.
     * @return The resolved data property value or undefined if property was not found.
     */
    private static _getPropertyValue(data, propertyPath);
    /**
     * A poor man's implementation of $.tmpl() from jquery templates. Renderes the
     * specified HTML content as a template, using the specified data.
     *
     * @param template The HTML markup or text to use as a a template.
     * @param data The data to render.
     * @return A jquery element.
     */
    static tmpl(template: string, data: any): string;
    /**
     * A static template engine for applying JS objects to a "jquery-tmpl" like template.
     */
    constructor();
}
