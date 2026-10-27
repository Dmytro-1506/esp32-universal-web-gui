import { useState, useEffect } from "react";
import { ToggleSwitch } from "../../components/ui/ToggleSwitch";
import { ColorPicker } from "../../components/ui/ColorPicker";
import { RangeSlider } from "../../components/ui/RangeSlider";
import { ActionButton } from "../../components/ui/ActionButton";
import "./LEDPanel.css";

const MIN_INTERVAL = 200;
const MAX_INTERVAL = 2000;
const MAX_SEQUENCE_COLORS = 10;

export function LEDPanel() {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(75);

  const [isBlink, setIsBlink] = useState(false);
  const [blinkInterval, setBlinkInterval] = useState(500);

  const [isPulse, setIsPulse] = useState(false);
  const [pulseInterval, setPulseInterval] = useState(500);

  const [color, setColor] = useState("#2563eb");

  const [isColorSequence, setIsColorSequence] = useState(false);
  const [colorSwitchInterval, setColorSwitchInterval] = useState(500);
  const [sequenceColors, setSequenceColors] = useState<string[]>([
    "#ff0000",
    "#00ff00",
    "#0000ff",
  ]);

  const [previewActive, setPreviewActive] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [previewColorIndex, setPreviewColorIndex] = useState(0);

  function stopEffects() {
    setIsBlink(false);
    setIsPulse(false);
    setIsColorSequence(false);
  }

  function handlePowerChange(enabled: boolean) {
    setIsOn(enabled);

    if (!enabled) {
      stopEffects();
      setPreviewActive(false);
    }
  }

  function handleBlinkChange(enabled: boolean) {
    setIsBlink(enabled);

    if (enabled) {
      setIsPulse(false);
    }
  }

  function handlePulseChange(enabled: boolean) {
    setIsPulse(enabled);

    if (enabled) {
      setIsBlink(false);
    }
  }

  function handleColorSequenceChange(enabled: boolean) {
    setIsColorSequence(enabled);
  }

  function addSequenceColor() {
    setSequenceColors((colors) =>
      colors.length < MAX_SEQUENCE_COLORS ? [...colors, "#ffffff"] : colors,
    );
  }

  function updateSequenceColor(index: number, newColor: string) {
    setSequenceColors((colors) =>
      colors.map((currentColor, currentIndex) =>
        currentIndex === index ? newColor : currentColor,
      ),
    );
  }

  function removeSequenceColor(index: number) {
    setSequenceColors((colors) =>
      colors.length > 1
        ? colors.filter((_, currentIndex) => currentIndex !== index)
        : colors,
    );
  }

  function togglePreview() {
    setPreviewVisible(true);
    setPreviewColorIndex(0);
    setPreviewActive((active) => !active);
  }

  // Simulate blinking and color-sequence changes in the browser.
  useEffect(() => {
    if (!previewActive || !isOn) {
      return;
    }

    if (isColorSequence && sequenceColors.length > 0) {
      const timer = window.setInterval(() => {
        setPreviewColorIndex((index) => (index + 1) % sequenceColors.length);
      }, colorSwitchInterval);

      return () => window.clearInterval(timer);
    }
  }, [
    previewActive,
    isOn,
    isColorSequence,
    colorSwitchInterval,
    sequenceColors.length,
  ]);

  useEffect(() => {
    if (!previewActive || !isOn) {
      return;
    }

    if (isBlink) {
      const timer = window.setInterval(() => {
        setPreviewVisible((visible) => !visible);
      }, blinkInterval);

      return () => window.clearInterval(timer);
    }
  }, [previewActive, isOn, isBlink, blinkInterval]);

  const previewColor = isColorSequence
    ? (sequenceColors[previewColorIndex] ?? color)
    : color;

  const isPreviewVisible = previewActive && isOn && previewVisible;

  const previewOpacity = isPreviewVisible ? brightness / 100 : 0;

  return (
    <section className="led-panel" aria-labelledby="led-panel-title">
      <header className="led-panel__header">
        <div className="led-panel__header-status-box">
          <div className="led-panel__header-status-item">
            <h2 id="led-panel-title">LED Control</h2>
            <p>Control LED power, color, brightness and effects.</p>
          </div>

          <div className="led-panel__header-status-item">
            <span
              className={`led-panel__status ${isOn ? "led-panel__status--on" : ""}`}
              aria-live="polite"
            >
              {isOn ? "On" : "Off"}
            </span>
          </div>
        </div>

        {/* Browser preview */}
        <div className="led-panel__preview">
          <div className="led-panel__preview-heading">
            <div>
              <h3>Preview</h3>
              <p>Simulate your LED settings in the browser.</p>
            </div>
          </div>

          <div className="led-panel__preview-controls">
            <div
              className={[
                "led-panel__preview-led",
                !previewActive ? "led-panel__preview-led--off" : "",
                previewActive && isOn && isPulse
                  ? "led-panel__preview-led--pulse"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--preview-color": previewActive ? previewColor : "#374151",
                  "--preview-opacity": previewActive ? previewOpacity : 0.5,
                  "--preview-duration": isPulse
                    ? `${pulseInterval}ms`
                    : `${blinkInterval}ms`,
                } as React.CSSProperties
              }
              role="img"
              aria-label={
                previewVisible
                  ? `LED preview, color ${previewColor}`
                  : "LED preview off"
              }
            />

            <ActionButton
              label={previewActive ? "Stop preview" : "Preview"}
              variant={previewActive ? "secondary" : "primary"}
              onClick={togglePreview}
              disabled={!isOn}
            />
          </div>
        </div>
      </header>

      <div className="led-panel__controls">
        <div className="led-panel__effect">
          {/* Power */}
          <ToggleSwitch
            id="led-power"
            label="LED Power"
            checked={isOn}
            onChange={handlePowerChange}
          />

          <ColorPicker
            id="led-color"
            label="LED Static Color"
            value={color}
            onChange={setColor}
            disabled={!isOn || isColorSequence}
          />

          <RangeSlider
            id="led-brightness"
            label="Brightness"
            value={brightness}
            min={0}
            max={100}
            step={1}
            unit="%"
            onChange={setBrightness}
            disabled={!isOn}
          />

          {/* Blink */}
          <ToggleSwitch
            id="led-blink"
            label="LED Blink"
            checked={isBlink}
            onChange={handleBlinkChange}
            disabled={!isOn}
          />

          <RangeSlider
            id="led-blink-interval"
            label="Blink interval"
            value={blinkInterval}
            min={MIN_INTERVAL}
            max={MAX_INTERVAL}
            step={100}
            unit=" ms"
            onChange={setBlinkInterval}
            disabled={!isOn || !isBlink}
          />

          {/* Pulse */}
          <ToggleSwitch
            id="led-pulse"
            label="LED Pulse"
            checked={isPulse}
            onChange={handlePulseChange}
            disabled={!isOn}
          />

          <RangeSlider
            id="led-pulse-interval"
            label="Pulse interval"
            value={pulseInterval}
            min={MIN_INTERVAL}
            max={MAX_INTERVAL}
            step={100}
            unit=" ms"
            onChange={setPulseInterval}
            disabled={!isOn || !isPulse}
          />
        </div>

        {/* Static color and brightness */}
        <div className="led-panel__effect">
          <ToggleSwitch
            id="led-color-sequence"
            label="Enable color switch sequence"
            checked={isColorSequence}
            onChange={handleColorSequenceChange}
            disabled={!isOn}
          />

          {/* Color sequence */}
          {isColorSequence && (
            <div className="led-panel__sequence-controls">
              {sequenceColors.map((sequenceColor, index) => (
                <div className="led-panel__sequence-color" key={index}>
                  <ColorPicker
                    id={`led-sequence-color-${index}`}
                    label={`Color ${index + 1}`}
                    value={sequenceColor}
                    onChange={(newColor) =>
                      updateSequenceColor(index, newColor)
                    }
                  />

                  <ActionButton
                    label="×"
                    ariaLabel={`Remove color ${index + 1}`}
                    variant="secondary"
                    type="reset"
                    onClick={() => removeSequenceColor(index)}
                    disabled={sequenceColors.length <= 1}
                  />
                </div>
              ))}

              <ActionButton
                label={`Add color (${sequenceColors.length}/${MAX_SEQUENCE_COLORS})`}
                variant="secondary"
                onClick={addSequenceColor}
                disabled={sequenceColors.length >= MAX_SEQUENCE_COLORS}
              />
            </div>
          )}

          <RangeSlider
            id="led-color-switch-interval"
            label="Color switch interval"
            value={colorSwitchInterval}
            min={MIN_INTERVAL}
            max={MAX_INTERVAL}
            step={100}
            unit=" ms"
            onChange={setColorSwitchInterval}
            disabled={!isOn || !isColorSequence}
          />
        </div>
      </div>
    </section>
  );
}
