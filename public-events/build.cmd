@echo off

IF EXIST "%ProgramFiles(x86)%\Microsoft SDKs\TypeScript\1.4\tsc.exe" (
	CALL "%ProgramFiles(x86)%\Microsoft SDKs\TypeScript\1.4\tsc.exe" -m amd --outDir out\scripts\PublicEvents scripts\PublicEvents\PublicEventsSource.ts
) ELSE (
	IF EXIST "%APPDATA%\npm\tsc.cmd" (
		CALL %APPDATA%\npm\tsc -m amd --outDir out\scripts\PublicEvents scripts\PublicEvents\PublicEventsSource.ts
	) ELSE (
		echo TypeScript compiler not installed.
	)
)
mkdir out
COPY main.html out\main.html
XCOPY sdk out\sdk\ /r /f /e /c /h /y
ECHO.
:end
